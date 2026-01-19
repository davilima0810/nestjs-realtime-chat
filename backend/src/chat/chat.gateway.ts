import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);

      client.data.user = {
        userId: payload.sub,
        username: payload.username,
      };

      client.join(payload.sub);

      await this.usersService.setOnline(payload.sub);

      this.server.emit('user_status', {
        userId: payload.sub,
        online: true,
      });
    } catch {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (!user) return;

    await this.usersService.setOffline(user.userId);

    this.server.emit('user_status', {
      userId: user.userId,
      online: false,
    });
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { to: string; message: string },
  ) {
    const user = client.data.user;
    if (!user) return;

    const savedMessage = await this.messagesService.create(user.userId, data.to, data.message);

    const fromUser = await this.usersService.findById(user.userId);

    if (!fromUser) {
      return;
    }

    this.server.emit('new_message', {
      from: {
        userId: user.userId,
        username: fromUser.username,
      },
      to: data.to,
      content: data.message,
      createdAt: savedMessage.createdAt, 
    });
  }
}

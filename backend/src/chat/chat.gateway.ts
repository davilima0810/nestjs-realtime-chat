import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
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
    const token = client.handshake.auth?.token;
    const payload = this.jwtService.verify(token);

    client.data.user = payload;
    client.join(payload.sub);

    await this.usersService.setOnline(payload.sub);

    this.server.emit('user_online', {
      userId: payload.sub,
      username: payload.username,
    });
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (!user) return;

    await this.usersService.setOffline(user.sub);

    this.server.emit('user_offline', {
      userId: user.sub,
      username: user.username,
    });
  }


  @SubscribeMessage('send_message')
  async handleMessage(
    client: Socket,
    payload: { to: string; message: string },
  ) {
    const from = client.data.user;

    // 🔥 salva no banco
    await this.messagesService.create(from.userId, payload.to, payload.message);

    // 🔥 envia APENAS para o destinatário
    this.server.to(payload.to).emit('new_message', {
      from,
      message: payload.message,
    });
  }
}

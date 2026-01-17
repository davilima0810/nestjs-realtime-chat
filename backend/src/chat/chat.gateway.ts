import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from '../auth/types/jwt-payload';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly messagesService: MessagesService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify<JwtPayload>(token);

      client.data.user = {
        userId: payload.sub,
        username: payload.username,
      };

      client.join(payload.sub);

      console.log('User connected:', client.data.user);
    } catch (error) {
      console.log('JWT error:', error?.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.data.user);
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

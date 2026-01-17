import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();

    const token =
      client.handshake.auth?.token ||
      client.handshake.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      // 👇 anexamos o usuário ao socket
      client.data.user = {
        userId: payload.sub,
        username: payload.username,
      };

      return true;
    } catch {
      return false;
    }
  }
}

import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MessagesModule],
  providers: [ChatGateway],
})
export class ChatModule {}

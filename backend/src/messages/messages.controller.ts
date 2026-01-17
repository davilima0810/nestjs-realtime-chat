import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':userId')
  async getConversation(@Param('userId') userId: string, @Req() req: any) {
    const currentUserId = req.user.userId;

    return this.messagesService.findConversation(currentUserId, userId);
  }
}

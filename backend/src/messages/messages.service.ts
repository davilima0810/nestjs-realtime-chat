import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async create(from: string, to: string, content: string): Promise<Message> {
    return this.messageModel.create({
      from: new Types.ObjectId(from),
      to: new Types.ObjectId(to),
      content,
    });
  }

  async findConversation(userA: string, userB: string) {
    const a = new Types.ObjectId(userA);
    const b = new Types.ObjectId(userB);

    return this.messageModel
      .find({
        $or: [
          { from: a, to: b },
          { from: b, to: a },
        ],
      })
      .sort({ createdAt: 1 });
  }
}

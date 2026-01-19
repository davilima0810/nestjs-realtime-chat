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

  // async findConversation(userA: string, userB: string) {
  //   const a = new Types.ObjectId(userA);
  //   const b = new Types.ObjectId(userB);

  //   return this.messageModel
  //     .find({
  //       $or: [
  //         { from: a, to: b },
  //         { from: b, to: a },
  //       ],
  //     })
  //     .sort({ createdAt: 1 });
  // }

  async findConversation(userA: string, userB: string) {
    const a = new Types.ObjectId(userA);
    const b = new Types.ObjectId(userB);

    const messages = await this.messageModel
      .find({
        $or: [
          { from: a, to: b },
          { from: b, to: a },
        ],
      })
      .sort({ createdAt: 1 })
      .populate('from', 'username')
      .exec();

    return messages.map((msg) => {
      const fromUser = msg.from as unknown as {
        _id: Types.ObjectId;
        username: string;
      };

      return {
        _id: msg._id.toString(),
        from: {
          userId: fromUser._id.toString(),
          username: fromUser.username,
        },
        to: msg.to.toString(),
        content: msg.content,
        createdAt: msg.createdAt,
      };
    });
  }
}

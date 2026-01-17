import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  // async setOnline(userId: string, online: boolean): Promise<void> {
  //   await this.userModel.updateOne({ _id: userId }, { online }).exec();
  // }

  async setOnline(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { online: true },
      { new: true },
    );
  }

  async setOffline(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { online: false },
      { new: true },
    );
  }
}

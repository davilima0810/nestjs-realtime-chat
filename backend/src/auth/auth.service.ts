import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const { name, username, password } = dto;

    const exists = await this.usersService.findByUsername(username);
    if (exists) {
      throw new UnauthorizedException('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);

    return this.usersService.create({
      name,
      username,
      password: hash,
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  async login(user: User): Promise<{
    access_token: string;
    user: {
      id: string;
      username: string;
      name: string;
    };
  }> {
    await this.usersService.setOnline(user._id.toString());

    const payload = {
      sub: user._id.toString(),
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
      },
    };
  }
}

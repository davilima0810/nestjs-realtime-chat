import type { Request } from 'express';
import { User } from '../../users/schemas/user.schema';

export type AuthRequest = Request & {
  user: User;
};

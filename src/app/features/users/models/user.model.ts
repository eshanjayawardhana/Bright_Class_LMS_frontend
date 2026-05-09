import { Role } from './role.type';
import { UserStatus } from './user-status.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}
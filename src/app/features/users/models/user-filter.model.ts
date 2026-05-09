import { Role } from './role.type';
import { UserStatus } from './user-status.type';

export interface UserFilter {
  search?: string;
  role?: Role | '';
  status?: UserStatus | '';
}
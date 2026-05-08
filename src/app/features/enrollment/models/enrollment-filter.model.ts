import { EnrollmentStatus } from './enrollment-status.type';

export interface EnrollmentFilter {
  search?: string;
  status?: EnrollmentStatus | '';
  page?: number;
  size?: number;
}

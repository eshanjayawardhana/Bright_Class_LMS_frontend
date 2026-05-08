import { EnrollmentStatus } from './enrollment-status.type';

export interface Enrollment {
  id: number;
  fullName: string;
  nic: string;
  bitId: string;
  phone: string;
  email: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  courseId: number;
  courseTitle: string;
}
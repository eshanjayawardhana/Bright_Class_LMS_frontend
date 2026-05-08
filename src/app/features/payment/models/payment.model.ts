import { PaymentStatus } from './payment-status.type';

export interface Payment {
  id: number;
  enrollmentId: number;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  amount: number;
  paymentSlipUrl: string;
  status: PaymentStatus;
  uploadedAt: string;
}
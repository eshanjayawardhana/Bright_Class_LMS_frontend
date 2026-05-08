import { PaymentStatus } from './payment-status.type';

export interface Payment {

  id: number;
  enrollmentId: number;

  studentName: string;
  studentEmail: string;
  courseTitle: string;

  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  paymentDate: string;
  slipUrl: string;
}
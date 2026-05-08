import { PaymentStatus } from './payment-status.type';

export interface PaymentFilter {
  search?: string;
  status?: PaymentStatus | '';
  page?: number;
  size?: number;
}
import { LeasingStatus } from '../../enums/leasing-status/leasing-status.enum';

export interface Leasing {
  id: number;
  transactionId: number;
  lesseeId: number;
  productId: number;
  status: LeasingStatus;
  startDate: number;
  endDate: number;
}

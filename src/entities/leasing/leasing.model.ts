import { LeasingStatus } from '../../enums/leasing-status/leasing-status.enum';
import { DeliveryStatus } from '../../enums/delivery-status/delivery-status.enum';

export interface Leasing {
  id: number;
  transactionId: number;
  lesseeId: number;
  productId: number;
  deliveryStatus: DeliveryStatus;
  status: LeasingStatus;
  startDate: number;
  endDate: number;
}

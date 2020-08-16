import { LeasingStatus } from "../../enums/leasing-status/leasing-status.enum";
import { Gender } from "../../enums/gender/gender.enum";
import { DeliveryStatus } from "../../enums/delivery-status/delivery-status.enum";

export interface Leasing {
  id: number;
  transactionId: string;
  payment_method: string;
  total_price: number;
  lesseeId: number;
  productId: number;
  deliveryStatus: DeliveryStatus;
  status: LeasingStatus;
  startDate: number;
  endDate: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: number;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  zipCode: number;
  isAdmin: boolean;
  password: string;
  profilePicture?: string;
}

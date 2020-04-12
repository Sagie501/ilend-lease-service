import { gql } from "apollo-server-express";

export const leasingStatusTypeDefs = gql`
  enum LeasingStatus {
    WAITING_FOR_APPROVE
    DENIED
    CANCELED
    WAITING_FOR_DELIVERY
    IN_DELIVERY
    DELIVERED
    RETURNED
  }
`;

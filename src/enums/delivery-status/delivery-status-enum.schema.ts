import { gql } from "apollo-server-express";

export const deliveryStatusTypeDefs = gql`
  enum DeliveryStatus {
    UNKNOWN
    CANCELED
    DONE
    IN_TRANSIT
    ARRIVED_IN_LOCAL_WAREHOUSE
    DISPATCHING_FROM_LOCAL_WAREHOUSE
  }
`;

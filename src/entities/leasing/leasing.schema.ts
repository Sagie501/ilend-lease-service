import { gql } from "apollo-server-express";

// TODO: Check what about the transactionId
export const typeDefs = gql`
  type Leasing {
    id: ID
    transactionId: String
    lessee: User
    product: Product
    deliveryStatus: DeliveryStatus
    status: LeasingStatus
    creationDate: Long
    startDate: Long
    endDate: Long
    total_price: Float
  }

  input LeasingInput {
    lesseeId: ID!
    productId: ID!
    creationDate: Long
    endDate: Long
  }

  enum Gender {
    MALE
    FEMALE
  }

  input UserInput {
    firstName: String
    lastName: String
    gender: Gender
    birthDate: Long
    email: String
    phoneNumber: String
    country: String
    city: String
    street: String
    zipCode: Int
    password: String
    profilePicture: String
  }

  extend type Query {
    getAllLeasesByLesseeId(lesseeId: ID!): [Leasing]
    getAllOpenedRequests(lessorId: ID!): [Leasing]
    getAllOnGoingDeliveriesRequests(lesseeId: ID!): [Leasing]
    getAllOnGoingRequests(lessorId: ID!): [Leasing]
    getAllLeasingRequests(lessorId: ID!): [Leasing]
    getAllLeasings: [Leasing]
    clientToken: String
  }

  extend type Mutation {
    openLeaseRequest(
      leasing: LeasingInput!
      cardNonce: String!
      price: Float
    ): Leasing
    setLeaseRequestStatus(leasingId: ID!, status: LeasingStatus, deliveryStatus: DeliveryStatus): Leasing
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
  }
`;

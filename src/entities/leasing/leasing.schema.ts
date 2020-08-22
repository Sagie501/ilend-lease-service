import { gql } from "apollo-server-express";

// TODO: Check what about the transactionId
export const typeDefs = gql`
  type Leasing {
    id: ID
    # transactionId:
    lessee: User
    product: Product
    deliveryStatus: DeliveryStatus
    status: LeasingStatus
    startDate: Long
    endDate: Long
  }

  input LeasingInput {
    lesseeId: ID!
    productId: ID!
    startDate: Long
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
    getAllOnGoingDeliveriesRequests(lessorId: ID!): [Leasing]
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
      user: UserInput!
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

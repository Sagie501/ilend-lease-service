import { gql } from 'apollo-server-express';

// TODO: Check what about the transactionId
export const typeDefs = gql`
  type Leasing {
    id: ID
    # transactionId: 
    lessee: User
    product: Product
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
  
  extend type Query {
    getAllLeasesByLesseeId(lesseeId: ID!): [Leasing]
    getAllOpenedRequests(lessorId: ID!): [Leasing]
    getAllOnGoingRequests(lessorId: ID!): [Leasing]
    getAllLeasingRequests(lessorId: ID!): [Leasing]
  }

  extend type Mutation {
    openLeaseRequest(leasing: LeasingInput!): Leasing
    setLeaseRequestStatus(leasingId: ID!, status: LeasingStatus) : Leasing
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
  }
  
  extend type Product @key(fields: "id") {
    id: ID! @external
  }
`;

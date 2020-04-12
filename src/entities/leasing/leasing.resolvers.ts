export const resolvers = {
  Mutation: {
    openLeaseRequest: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.openLeaseRequest(args.leasing);
    },
    setLeaseRequestStatus: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.setLeaseRequestStatus(args.leasingId, args.status);
    }
  },
  Leasing: {
    product: (leasing) => {
      return { __typename: "Product", id: leasing.productId };
    },
    lessee: (leasing) => {
      return { __typename: "User", id: leasing.lesseeId };
    }
  }
};

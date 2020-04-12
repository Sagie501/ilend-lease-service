export const resolvers = {
  Mutation: {
    openLeaseRequest: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.openLeaseRequest(args.leasing);
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

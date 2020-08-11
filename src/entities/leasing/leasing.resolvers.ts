export const resolvers = {
  Query: {
    getAllLeasesByLesseeId: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.getAllLeasesByLesseeId(args.lesseeId);
    },
    getAllOpenedRequests: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.getAllOpenedRequests(args.lessorId);
    },
    getAllOnGoingDeliveriesRequests: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.getAllOnGoingDeliveriesRequests(args.lessorId);
    },
    getAllOnGoingRequests: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.getAllOnGoingRequests(args.lessorId);
    },
    getAllLeasingRequests: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.getAllLeasingRequests(args.lessorId);
    },
    getAllLeasings: async (source, args, { dataSources }) => {
      return await dataSources.leasingDataSource.leasingConnector.getAllLeasings();
    }
  },
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
      return { __typename: 'Product', id: leasing.productId };
    },
    lessee: (leasing) => {
      return { __typename: 'User', id: leasing.lesseeId };
    }
  }
};

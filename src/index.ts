import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { rootResolvers } from './root-resolvers';
import { rootTypeDefs } from './root-schema';
import { Environment } from './environment/environment';
import { Config } from './environment/config';
import { buildFederatedSchema } from '@apollo/federation';
import { LeasingDataSource } from './data-source/leasing-data-source';

const app = express();

const config: Config = Environment.getConfig();

const leasingDataSource = new LeasingDataSource(config.dbConfig);
const server = new ApolloServer({
  schema: buildFederatedSchema([{
    typeDefs: rootTypeDefs,
    resolvers: rootResolvers
  }]),
  dataSources: () => {
    return {
      leasingDataSource
    };
  }
});
server.applyMiddleware({ app });

app.listen({ port: config.port }, () => {
  console.log(`${config.serviceName} ready at port: ${config.port}`)
});

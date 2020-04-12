import { typeDefs as leasingTypeDefs } from '../entities/leasing/leasing.schema';
import { mergeTypes } from 'merge-graphql-schemas';
import { gql } from 'apollo-server-express';
import { leasingStatusTypeDefs } from '../enums/leasing-status/leasing-status-enum.schema';
import { typeDefs as scalarsTypeDefs } from 'graphql-scalars';

export const rootTypeDefs = gql`${mergeTypes([gql`${scalarsTypeDefs}`, leasingStatusTypeDefs, leasingTypeDefs])}`;

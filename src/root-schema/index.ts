import { typeDefs as leasingTypeDefs } from '../entities/leasing/leasing.schema';
import { gql } from 'apollo-server-express';
import { leasingStatusTypeDefs } from '../enums/leasing-status/leasing-status-enum.schema';
import { typeDefs as scalarsTypeDefs } from 'graphql-scalars';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { deliveryStatusTypeDefs } from '../enums/delivery-status/delivery-status-enum.schema';

export const rootTypeDefs = gql`${mergeTypeDefs([gql`${scalarsTypeDefs}`, deliveryStatusTypeDefs, leasingStatusTypeDefs, leasingTypeDefs], {
  useSchemaDefinition: true,
  forceSchemaDefinition: true,
  throwOnConflict: true,
  commentDescriptions: true,
  reverseDirectives: true
})}`;

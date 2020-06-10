import { resolvers as leasingResolver } from '../entities/leasing/leasing.resolvers';
import { resolvers as scalarsResolver } from 'graphql-scalars';
import { mergeResolvers } from '@graphql-tools/merge';

export const rootResolvers = mergeResolvers([leasingResolver, scalarsResolver]);

import { resolvers as leasingResolver } from '../entities/leasing/leasing.resolvers';
import * as _ from 'lodash';
import { resolvers as scalarsResolver } from 'graphql-scalars';

export const rootResolvers = _.merge(leasingResolver, scalarsResolver);

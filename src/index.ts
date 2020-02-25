import buildGraphQLProvider from 'ra-data-graphql';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'ra-core';
import { buildQueryFactory } from './buildQuery';
import { createClient } from './createClient';
import { buildQueryFactoryOpts, createClientOpts } from './types';
import pluralize from 'pluralize';

export const buildAppsyncProvider = async ({
  queries,
  mutations,
  ...options
}: buildQueryFactoryOpts & createClientOpts) => {
  const client = createClient(options);
  return buildGraphQLProvider({
    buildQuery: buildQueryFactory({ queries, mutations }),
    client,
    introspection: {
      operationNames: {
        [GET_LIST]: (resource: any) => `list${pluralize(resource.name)}`,
        [GET_ONE]: (resource: any) => `get${resource.name}`,
        [GET_MANY]: (resource: any) => `list${pluralize(resource.name)}`,
        [GET_MANY_REFERENCE]: (resource: any) =>
          `list${pluralize(resource.name)}`,
        [CREATE]: (resource: any) => `create${resource.name}`,
        [UPDATE]: (resource: any) => `update${resource.name}`,
        [DELETE]: (resource: any) => `delete${resource.name}`,
      },
      exclude: undefined,
      include: undefined,
    },
  });
};

export default buildAppsyncProvider;

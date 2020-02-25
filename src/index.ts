import buildGraphQLProvider from 'ra-data-graphql';
import { buildQueryFactory } from './buildQuery';
import { createClient } from './createClient';
import { buildQueryFactoryOpts, createClientOpts } from './types';

export const buildAppsyncProvider = async ({
  queries,
  mutations,
  ...options
}: buildQueryFactoryOpts & createClientOpts) => {
  const client = createClient(options);
  return buildGraphQLProvider({
    buildQuery: buildQueryFactory({ queries, mutations }),
    client,
  });
};

export default buildAppsyncProvider;

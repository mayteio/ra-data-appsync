import { buildAppsyncProvider } from './ra-data-appsync/ra-data-appsync.cjs.development';
import config from './aws-exports';
import schema from './graphql/schema.json';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
// import * as queries from '../graphql/queries';

export const buildDataProvider = async () =>
  await buildAppsyncProvider({
    endpoint: config.aws_appsync_graphqlEndpoint,
    schema: schema.data,
    auth: {
      url: config.aws_appsync_graphqlEndpoint,
      region: config.aws_appsync_region,
      auth: {
        // @ts-ignore
        type: config.aws_appsync_authenticationType,
        apiKey: config.aws_appsync_apiKey,
      },
    },
    queries,
    mutations,
  });

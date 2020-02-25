import gql from 'graphql-tag';
import { buildQueryFactoryOpts } from './types';

export const buildQueryFactory = ({
  queries,
}: // mutations,
buildQueryFactoryOpts) => (introspection: any) => (
  raFetchType: string,
  modelType: string,
  params: Record<string, any>
) => {
  console.log(introspection);

  switch (raFetchType) {
    case 'GET_LIST':
      return {
        query: gql(queries[`list${modelType}s`]),
        variables: { params },
        parseResponse: (response: any) => ({
          data: response.data[`list${modelType}s`].items,
          total: null,
        }),
      };
    case 'GET_ONE':
      return {
        query: gql(queries[`get${modelType}`]),
        variables: { params },
        parseResponse: (response: any) => ({
          data: response.data[`get${modelType}`],
        }),
      };
    default:
      return {};
  }
};

import gql from 'graphql-tag';
import { GET_LIST, GET_ONE, GET_MANY, CREATE, UPDATE, DELETE } from 'ra-core';
import { buildQueryFactoryOpts } from './types';

export const buildQueryFactory = ({
  queries,
  mutations,
}: buildQueryFactoryOpts) => () => (
  raFetchType: string,
  modelType: string,
  params: Record<string, any>
) => {
  switch (raFetchType) {
    case GET_LIST:
      return {
        query: gql(queries[`list${modelType}s`]),
        variables: {
          filter: params.filter,
          limit: params.pagination?.perPage,
          // we somehow need to override params.pagination.page to return the nextToken instead.
          // nextToken: params.pagination.page
        },
        parseResponse: (response: any) => ({
          data: response.data[`list${modelType}s`].items,
          total: null,
        }),
      };
    case GET_ONE:
      return {
        query: gql(queries[`get${modelType}`]),
        variables: params,
        parseResponse: (response: any) => ({
          data: response.data[`get${modelType}`],
        }),
      };
    case CREATE:
      return {
        query: gql(mutations[`create${modelType}`]),
        variables: { input: params },
        parseResponse: (response: any) => ({
          data: response.data[`create${modelType}`],
        }),
      };
    case UPDATE:
      return {
        query: gql(mutations[`update${modelType}`]),
        variables: { input: { id: params.id, ...params.data } },
        parseResponse: (response: any) => ({
          data: response.data[`update${modelType}`],
        }),
      };
    case DELETE:
      return {
        query: gql(mutations[`delete${modelType}`]),
        variables: { input: params },
        parseResponse: (response: any) => ({
          data: response.data[`delete${modelType}`],
        }),
      };
    case GET_MANY:
      return {
        query: gql(queries[`list${modelType}`]),
        variables: {
          limit: params.ids.length,
          filter: {
            or: params.ids.map((id: string | number) => ({ id: { eq: id } })),
          },
        },
      };
    default:
      return {};
  }
};

import { GET_LIST, GET_MANY, GET_MANY_REFERENCE } from 'ra-core';
import { IntrospectionResultData } from 'apollo-cache-inmemory';

const sanitizeResource = (data: any) => {
  const result: any = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith('_')) {
      return acc;
    }

    const dataKey = data[key];

    if (dataKey === null || dataKey === undefined) {
      return acc;
    }

    if (Array.isArray(dataKey)) {
      if (typeof dataKey[0] === 'object') {
        return {
          ...acc,
          [key]: dataKey.map(sanitizeResource),
          [`${key}Ids`]: dataKey.map(d => d.id),
        };
      } else {
        return { ...acc, [key]: dataKey };
      }
    }

    if (typeof dataKey === 'object') {
      return {
        ...acc,
        ...(dataKey &&
          dataKey.id && {
            [`${key}.id`]: dataKey.id,
          }),
        [key]: sanitizeResource(dataKey),
      };
    }

    return { ...acc, [key]: dataKey };
  }, {});

  return result;
};

export default (_: IntrospectionResultData) => (
  aorFetchType: string,
  resource: any
) => (response: any) => {
  const data = response.data;

  if (
    aorFetchType === GET_LIST ||
    aorFetchType === GET_MANY ||
    aorFetchType === GET_MANY_REFERENCE
  ) {
    return {
      data: data[`list${resource.type.name}s`].items.map(sanitizeResource),
      nextToken: data[`list${resource.type.name}s`].nextToken,
      total: 999,
    };
  }

  return { data: sanitizeResource(data) };
};

import Amplify from 'aws-amplify';
// @ts-ignore
import config from '../example/src/aws-exports';
Amplify.configure(config);

export * from './buildAppsyncProvider';
export * from './RaAppSyncPagination';
export * from './S3Input';
export * from './S3ImageField';
export * from './authProvider';

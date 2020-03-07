import { Auth } from 'aws-amplify';

export const authProvider = {
  login: ({ username, password, federated, provider }: any) =>
    username && password && !federated
      ? Auth.signIn(username, password)
      : Auth.federatedSignIn({ provider }),
  logout: () => Auth.signOut(),
  checkAuth: () => Auth.currentAuthenticatedUser(),
  checkError: () => Auth.currentCredentials(),
  getPermissions: () =>
    Promise.all([
      Auth.currentAuthenticatedUser(),
      Auth.currentCredentials(),
    ]).then(([user, { identityId }]) => ({
      identityId,
      groups: user.signInUserSession.accessToken.payload['cognito:groups'],
    })),
};

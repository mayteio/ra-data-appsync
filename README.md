# `ra-data-amplify`

> Easily bootstrap an admin interface for your AppSync APIs.

AWS AppSync is a great tool for generating GraphQL APIs that string together AWS resources. Amplify is a great tool for bootstrapping app backends so you can focus on building features.

What they don't do, is provide an easy admin interface to manage this data. Enter `react-admin` and this package, `ra-data-appsync`.

## Installation

```bash
yarn create react-app amplify-backend-app
cd amplify-backend-app
yarn add react-admin ra-data-amplify aws-amplify
amplify add api # run through the setup
amplify push # will generate aws-exports.js
yarn start
```

## Usage

```javascript
// buildDataProvider.js
import buildAppsyncProvider from 'ra-data-appsync';
import Auth from '@aws-amplify/auth';

// import generated files for use
import config from './aws-exports';
import schema from './graphql/schema.json';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

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
```

```javascript
// App.js
import React, { useEffect, useState } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { buildDataProvider } from './dataProvider';

function App() {
  const [dataProvider, setDataProvider] = useState();
  useEffect(() => {
    // create it in an effect so you can re-create it if using Auth.
    buildDataProvider().then(dataProvider =>
      setDataProvider(() => dataProvider)
    );
  }, []);

  return dataProvider ? (
    <Admin dataProvider={dataProvider}>
      <Resource name="Post" list={ListGuesser} />
    </Admin>
  ) : (
    <>Loading</>
  );
}

export default App;
```

Tada:
[Screenshot of workiung app]

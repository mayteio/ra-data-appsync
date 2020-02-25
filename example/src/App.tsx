import React, { useEffect, useState } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { buildDataProvider } from './dataProvider';

function App() {
  const [dataProvider, setDataProvider] = useState();
  useEffect(() => {
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

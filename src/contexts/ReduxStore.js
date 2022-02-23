import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import useStore from '../reducers';

export default function ReduxStore(props) {
  const { store, persistor } = useStore();

  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor} {...props} />
    </Provider>
  );
}

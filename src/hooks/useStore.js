
import { createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import localforage from 'localforage';
import { ReduxMixer } from 'react-redux-mixer';

const config = {
  key: 'root',
  storage: localforage,
  debug: process.env.NODE_ENV === 'development',
};

const reducers = persistCombineReducers(config, {
  user: ReduxMixer('user', {}),
  candidate: ReduxMixer('candidate', {}),
  candidates: ReduxMixer('candidates', [])
});

const useStore = () => {
  const store = createStore(reducers);

  let debounce;
  store.subscribe(() => {
    const states = store.getState();

    if (process.env.NODE_ENV === 'development') {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('updated state', states);
      }, 1000);
    }
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export default useStore;

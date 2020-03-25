import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import expireReducer from 'redux-persist-expire';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: '@Safezone',
      storage,
      whitelist: ['auth', 'user'],
      transforms: [
        expireReducer('auth', {
          expireSeconds: 60 * 60 * 24,
        }),
      ],
    },
    reducers
  );

  return persistedReducers;
};

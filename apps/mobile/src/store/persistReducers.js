import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      storage: AsyncStorage,
      key: 'safezone',
      whitelist: ['auth', 'user'],
    },
    reducers
  );
  return persistedReducer;
};

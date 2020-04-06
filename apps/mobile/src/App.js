import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { colors } from './config/layout';

import Routes from './routes';

import './config/reactotron';

import { store, persistor } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Routes />
      </PersistGate>
    </Provider>
  );
}

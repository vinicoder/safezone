import React from 'react';
import { StatusBar } from 'react-native';

import { colors } from './config/layout';

import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Routes />
    </>
  );
}

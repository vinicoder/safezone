import React from 'react';
import { StatusBar } from 'react-native';

import layoutConfig from '~/config/layout';

import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={layoutConfig.colors.primary}
        barStyle="light-content"
      />
      <Routes />
    </>
  );
}

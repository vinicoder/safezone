import React from 'react';
import Constants from 'expo-constants';
import { Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Logo from '~/assets/logo.png';
import Avatar from './components/Avatar';

const headerHeight =
  Constants.statusBarHeight +
  (Dimensions.get('window').height <= 600 ? 40 : 70);

const HeaderDefault = {
  headerTitle: () => {},
  headerLeft: () => <Image source={Logo}></Image>,
  headerRight: () => <Avatar />,
  headerLeftContainerStyle: { marginLeft: 30 },
  headerRightContainerStyle: { marginRight: 30 },
};

import Dashboard from '~/pages/Dashboard';

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2A1E5C',
          height: headerHeight,
          elevation: 0,
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={HeaderDefault}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

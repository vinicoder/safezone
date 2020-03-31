import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigations } from '~/config/layout';

import Dashboard from '~/pages/Dashboard';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import CompanyUpdate from '~/pages/CompanyUpdate';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={navigations.stackHeader}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={navigations.stackDefaultHeader}
      />
      <Stack.Screen
        name="SignIn"
        options={{ title: 'Acesse sua conta' }}
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        options={{ title: 'Criar conta' }}
        component={SignUp}
      />
      <Stack.Screen
        name="Profile"
        options={{ title: 'Atualizar conta' }}
        component={Profile}
      />
      <Stack.Screen
        name="CompanyUpdate"
        options={{ title: 'Atualizar empresa' }}
        component={CompanyUpdate}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

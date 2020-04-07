import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { navigations } from '~/config/layout';

import Dashboard from '~/pages/Dashboard';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import Password from '~/pages/Password';
import Company from '~/pages/Company';
import CompanyUpdate from '~/pages/CompanyUpdate';

const authScreens = ['Profile', 'Password', 'CompanyUpdate'];

const Stack = createStackNavigator();

const AppRoutes = ({ navigation, route }) => {
  const signed = useSelector(state => state.auth.signed);
  const page = route.params ? route.params.page : '';
  const screen = authScreens.includes(page) && !signed ? 'SignIn' : page;

  if (screen) {
    navigation.push('App', { screen });
  }

  return (
    <Stack.Navigator screenOptions={navigations.stackHeader}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={navigations.stackDefaultHeader}
      />
      <Stack.Screen
        name="Company"
        options={{ title: 'Situações da Empresa' }}
        component={Company}
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
        name="Password"
        options={{ title: 'Atualizar senha' }}
        component={Password}
      />
      <Stack.Screen
        name="CompanyUpdate"
        options={{ title: 'Atualizar empresa' }}
        component={CompanyUpdate}
      />
    </Stack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="App" component={AppRoutes} />
    </Stack.Navigator>
  </NavigationContainer>
);

AppRoutes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

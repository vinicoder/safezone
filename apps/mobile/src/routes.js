import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { navigations } from '~/config/layout';

import Dashboard from '~/pages/Dashboard';
import SignIn from '~/pages/SignIn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const guestStackScreen = () => (
  <Stack.Navigator screenOptions={navigations.stackHeader}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={navigations.stackDefaultHeader}
    />
  </Stack.Navigator>
);

const userStackScreen = () => (
  <Stack.Navigator screenOptions={navigations.stackHeader}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={navigations.stackDefaultHeader}
    />
  </Stack.Navigator>
);

const tabBarIconGuest = ({ color, size }) => (
  <Icon name="map-outline" color={color} size={size} />
);

const tabBarIconUser = ({ color, size }) => (
  <Icon name="map-plus" color={color} size={size} />
);

const tabsScreen = () => (
  <Tab.Navigator initialRouteName="Feed" tabBarOptions={navigations.tabBar}>
    <Tab.Screen
      name="Guest"
      component={guestStackScreen}
      options={{
        tabBarLabel: 'Empresas',
        tabBarIcon: tabBarIconGuest,
      }}
    />
    <Tab.Screen
      name="User"
      component={userStackScreen}
      options={{
        tabBarLabel: 'Atualizar empresa',
        tabBarIcon: tabBarIconUser,
      }}
    />
  </Tab.Navigator>
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={navigations.stackHeader}>
      <Stack.Screen
        name="Tabs"
        component={tabsScreen}
        headerMode="none"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        options={{ title: 'Acesse sua conta' }}
        component={SignIn}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

tabBarIconGuest.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

tabBarIconUser.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

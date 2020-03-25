import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import layoutConfig from '~/config/layout';

import Dashboard from '~/pages/Dashboard';
import SignIn from '~/pages/SignIn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const guestStackScreen = () => (
  <Stack.Navigator screenOptions={layoutConfig.navigation.stackHeader}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={layoutConfig.navigation.stackDefaultHeader}
    />
  </Stack.Navigator>
);

const userStackScreen = () => (
  <Stack.Navigator screenOptions={layoutConfig.navigation.stackHeader}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={layoutConfig.navigation.stackDefaultHeader}
    />
  </Stack.Navigator>
);

const tabsScreen = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    tabBarOptions={layoutConfig.navigation.tabBar}
  >
    <Tab.Screen
      name="Guest"
      component={guestStackScreen}
      options={{
        tabBarLabel: 'Empresas',
        tabBarIcon: ({ color, size }) => (
          <Icon name="map-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="User"
      component={userStackScreen}
      options={{
        tabBarLabel: 'Atualizar empresa',
        tabBarIcon: ({ color, size }) => (
          <Icon name="map-plus" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={layoutConfig.navigation.stackHeader}>
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

import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import layoutConfig from '~/config/layout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Logo from '~/assets/logo.png';
import Avatar from './components/Avatar';

const HeaderDefault = {
  headerTitle: () => {},
  headerLeft: () => <Image source={Logo}></Image>,
  headerRight: () => <Avatar />,
  headerLeftContainerStyle: { marginLeft: 30 },
  headerRightContainerStyle: { marginRight: 30 },
};

import Dashboard from '~/pages/Dashboard';

const guestStackScreen = () => (
  <Stack.Navigator screenOptions={layoutConfig.navigation.stackHeader}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={HeaderDefault}
    />
  </Stack.Navigator>
);

const userStackScreen = () => (
  <Stack.Navigator screenOptions={layoutConfig.navigation.stackHeader}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={HeaderDefault}
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
    </Stack.Navigator>
  </NavigationContainer>
);

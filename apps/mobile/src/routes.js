import React from 'react';
import Constants from 'expo-constants';
import { Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import layoutOptions from '~/config/layout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Logo from '~/assets/logo.png';
import Avatar from './components/Avatar';

const { height: window_height } = Dimensions.get('window');
const { height: screen_height } = Dimensions.get('screen');
const { statusBarHeight } = Constants;

const isInifityScreen = window_height === screen_height;

const headerHeight = statusBarHeight + (window_height <= 600 ? 40 : 70);

const HeaderDefault = {
  headerTitle: () => {},
  headerLeft: () => <Image source={Logo}></Image>,
  headerRight: () => <Avatar />,
  headerLeftContainerStyle: { marginLeft: 30 },
  headerRightContainerStyle: { marginRight: 30 },
};

import Dashboard from '~/pages/Dashboard';

const guestStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: layoutOptions.colors.primary,
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
);

const userStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: layoutOptions.colors.primary,
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
);

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: layoutOptions.colors.secondary,
        inactiveTintColor: layoutOptions.colors.primary,
        style: {
          height: isInifityScreen ? 90 : 65,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: 'rgba(155,155,155,.2)',
          elevation: 0,
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        tabStyle: {
          paddingTop: 10,
          paddingBottom: isInifityScreen ? 0 : 10,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
      }}
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
  </NavigationContainer>
);

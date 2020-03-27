import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Appearance } from 'react-native-appearance';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

import LogoSmall from '~/assets/logo-small.png';

import Logo from '~/assets/logo.png';
import Avatar from '~/components/Avatar';

const { height: windowHeight } = Dimensions.get('window');
const { statusBarHeight } = Constants;

const isNewIOS =
  Device.osName === 'iOS' && parseInt(Device.osVersion, 10) >= 13;
const headerHeight = statusBarHeight + (windowHeight <= 600 ? 50 : 70);
const tabBarHeight = isNewIOS ? 90 : 65;

export const theme = Appearance.getColorScheme();

export const colors = {
  primary: '#2A1E5C',
  secondary: '#ee4266',
  success: '#049A99',
};

export const navigations = {
  stackHeader: {
    headerBackTitleVisible: false,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.primary,
      height: headerHeight,
      elevation: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerLeftContainerStyle: {
      paddingLeft: 20,
    },
    headerRightContainerStyle: {
      paddingRight: 30,
    },
    headerTitleAlign: 'center',
    headerRight: () => <Image source={LogoSmall} />,
  },
  stackDefaultHeader: ({ navigation }) => ({
    headerTitle: () => {},
    headerLeft: () => <Image source={Logo} />,
    headerRight: () => <Avatar onPress={() => navigation.navigate('SignIn')} />,
    headerLeftContainerStyle: { marginLeft: 30 },
    headerRightContainerStyle: { marginRight: 30 },
  }),
  tabBar: {
    keyboardHidesTabBar: Device.osName === 'android',
    activeTintColor: colors.secondary,
    inactiveTintColor: colors.primary,
    style: {
      height: tabBarHeight,
      backgroundColor: 'white',
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
      paddingBottom: isNewIOS ? 0 : 10,
    },
    labelStyle: {
      fontWeight: 'bold',
    },
  },
};

export default {
  headerHeight,
  tabBarHeight,
  colors,
  navigations,
};

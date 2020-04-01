import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Appearance } from 'react-native-appearance';
import Constants from 'expo-constants';

import LogoSmall from '~/assets/logo-small.png';

import Logo from '~/assets/logo.png';
import Avatar from '~/components/Avatar';

const { height: windowHeight } = Dimensions.get('window');
const { statusBarHeight } = Constants;

const headerHeight = statusBarHeight + (windowHeight <= 600 ? 50 : 70);

export const theme = Appearance.getColorScheme();

export const colors = {
  primary: '#2A1E5C',
  secondary: '#ee4266',
  success: '#049A99',
  info: '#E2E2E2',
  white: '#FFFFFF',
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
    headerRight: () => (
      <Avatar onPress={() => navigation.navigate('Profile')} />
    ),
    headerLeftContainerStyle: { marginLeft: 30 },
    headerRightContainerStyle: { marginRight: 30 },
  }),
};

export default {
  windowHeight,
  headerHeight,
  colors,
  navigations,
};

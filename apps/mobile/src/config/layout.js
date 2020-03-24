import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

const { height: window_height } = Dimensions.get('window');
const { statusBarHeight } = Constants;

const isNewIOS =
  Device.osName === 'iOS' && parseInt(Device.osVersion, 10) >= 13;
const headerHeight = statusBarHeight + (window_height <= 600 ? 50 : 70);
const tabBarHeight = isNewIOS ? 90 : 65;

export const colors = {
  primary: '#2A1E5C',
  secondary: '#ee4266',
};

export const navigation = {
  stackHeader: {
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
  },
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
  navigation,
};

import { Dimensions } from 'react-native';
import { Appearance } from 'react-native-appearance';
import Constants from 'expo-constants';

import {
  headerLeft,
  headerRight,
  headerLeftDefault,
  headerRightDefault,
} from '~/components/Header';

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
  stackHeader: ({ navigation, route }) => ({
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
    headerRight: () => headerRight({ navigation, route }),
    headerLeft: () => headerLeft({ navigation, route }),
  }),
  stackDefaultHeader: ({ navigation, route }) => ({
    headerTitle: () => {},
    headerLeft: () => headerLeftDefault({ navigation, route }),
    headerRight: () => headerRightDefault({ navigation, route }),
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

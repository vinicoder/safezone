import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import LogoSmall from '~/assets/logo-small.png';
import Logo from '~/assets/logo.png';
import Avatar from '~/components/Avatar';

import { Button } from './styles';

export const headerLeftDefault = () => <Image source={Logo} />;

export const headerRightDefault = ({ navigation }) => (
  <Avatar onPress={() => navigation.navigate('App', { page: 'Profile' })} />
);

export const headerLeft = ({ navigation: { canGoBack, goBack, push } }) => (
  <Button
    onPress={() =>
      canGoBack() ? goBack() : push('App', { page: 'Dashboard' })
    }
  >
    <Icon name="keyboard-arrow-left" size={30} color="#FFFFFF" />
  </Button>
);

export const headerRight = () => <Image source={LogoSmall} />;

headerRightDefault.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

headerLeft.propTypes = {
  navigation: PropTypes.shape({
    canGoBack: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

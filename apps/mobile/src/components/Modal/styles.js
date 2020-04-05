import styled from 'styled-components/native';
import { StyleSheet, Animated } from 'react-native';
import layoutConfig, { colors } from '~/config/layout';

import ButtonDefault from '~/components/Button';

const visibleArea = layoutConfig.windowHeight - layoutConfig.headerHeight;

export const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const Gap = styled.TouchableOpacity.attrs({
  activeOpacity: 0,
})`
  flex: 1;
`;

export const Container = styled(Animated.View)`
  background: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -30px;
  max-height: ${`${visibleArea}px`};
  transform: ${`translateY(${visibleArea}px)`};
`;

export const Body = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})`
  max-height: 74%;
`;

export const Content = styled.View`
  padding: 0 30px 30px 30px;
`;

export const Header = styled.View`
  padding: 30px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: ${colors.primary};
`;

export const Subtitle = styled.Text`
  text-align: center;
  margin-top: 5px;
  font-weight: 300;
  font-size: 16px;
  color: ${colors.primary};
`;

export const Footer = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  border-top-width: ${`${StyleSheet.hairlineWidth}px`};
  border-top-color: #ccc;
`;

export const Button = styled(ButtonDefault)`
  flex: 1;
  margin: 5px;
`;

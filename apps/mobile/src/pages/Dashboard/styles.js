import { Animated } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

import layoutOptions from '~/config/layout';

import bgImage from '~/assets/bg-intro.png';

export const Container = styled.View`
  background: ${layoutOptions.colors.primary};
  flex: 1;
`;

export const Header = styled(Animated.View)`
  padding: 30px;
  flex-direction: row;
  position: relative;
`;

export const HeaderInfo = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  z-index: 2;
`;

export const HeaderImage = styled.ImageBackground.attrs({
  source: bgImage,
  resizeMode: 'contain',
})`
  position: absolute;
  top: 30px;
  right: -10px;
  width: 180px;
  height: 166px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const HeaderButton = styled(Button)`
  margin: 20px 0;
`;

export const HeaderLink = styled.TouchableOpacity`
  border-bottom-color: #fff;
  border-bottom-width: 1px;
  padding-bottom: 10px;
  padding-right: 20px;
`;

export const HeaderLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const Draggable = styled(Animated.View)`
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import layoutOptions from '~/config/layout';

export const ListContainer = styled(Animated.View)`
  height: 100%;
  z-index: 2;
  position: relative;
`;

export const ListContainerScroll = styled.ScrollView``;

export const Content = styled.View`
  background: #f2f0f9;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: 20px;
`;

export const HeaderContainer = styled(Animated.View)`
  background: #f2f0f9;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 0 30px;
  height: 100px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const SmallHeaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  overflow: hidden;
`;

export const SmallHeaderContent = styled(Animated.View)`
  width: 100%;
  height: 64px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(125, 125, 125, 0.2);
`;

export const HeaderInfo = styled.View`
  flex: 1;
`;

export const HeaderSubtitle = styled.Text`
  color: ${layoutOptions.colors.secondary};
  font-size: ${props => (props.small ? '12px' : '14px')};
`;

export const HeaderTitle = styled.Text`
  font-size: ${props => (props.small ? '24px' : '30px')};
  color: ${layoutOptions.colors.primary};
  font-weight: bold;
`;

export const HeaderActions = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonChangeLocal = styled(RectButton)`
  padding: 5px;
  padding-right: 10px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonChangeLocalText = styled.Text`
  font-size: 14px;
  color: ${layoutOptions.colors.primary};
`;

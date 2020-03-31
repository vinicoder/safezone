import { Animated } from 'react-native';
import styled from 'styled-components/native';
import Label from '~/components/Label';
import { List } from '~/components/Label/styles';

import { colors } from '~/config/layout';

import bgImage from '~/assets/bg-company-profile.png';

export const Container = styled.View`
  background: ${colors.primary};
  flex: 1;
`;

export const Header = styled(Animated.View)`
  padding: 30px;
  flex-direction: row;
  position: relative;
  height: 235px;
  align-items: center;
`;

export const HeaderInfo = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0.8;
  z-index: 2;
`;

export const HeaderImage = styled.ImageBackground.attrs({
  source: bgImage,
  resizeMode: 'contain',
})`
  position: absolute;
  top: 30px;
  right: -50px;
  width: 255px;
  height: 235px;
`;

export const HeaderSlug = styled.Text`
  color: ${colors.secondary};
  font-size: 14px;
  font-weight: bold;
`;

export const HeaderTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const Draggable = styled(Animated.View)`
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

export const LabelList = styled(List)`
  margin-top: 10px;
`;

export const LabelItem = styled(Label)`
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const ListHeader = styled.Text`
  padding: 20px 30px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.primary};
`;

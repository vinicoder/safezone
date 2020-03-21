import styled from 'styled-components/native';
import Button from '~/components/Button';

import bgImage from '~/assets/bg-intro.png';

export const Container = styled.View`
  background: #2a1e5c;
  flex: 1;
  padding: 0 30px;
`;

export const Header = styled.View`
  padding: 30px 0;
  flex-direction: row;
  position: relative;
`;

export const HeaderInfo = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0.7;
  z-index: 2;
`;

export const HeaderImage = styled.ImageBackground.attrs({
  source: bgImage,
  resizeMode: 'contain',
})`
  position: absolute;
  top: 30px;
  right: -40px;
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

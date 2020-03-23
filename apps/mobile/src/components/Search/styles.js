import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import layoutConfig from '~/config/layout';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f2f0f9;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  z-index: 2;
  padding: 20px 0;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 0 20px;
`;

export const ButtonReturn = styled(RectButton)`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const InputContainer = styled.View`
  flex: 1;
  box-shadow: 0px 4px 8px rgba(155, 155, 155, 0.1);
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: layoutConfig.colors.primary,
})`
  background: #fff;
  height: 42px;
  border-radius: 21px;
  flex: 1;
  padding: 0 21px;
  font-size: 16px;
  color: ${layoutConfig.colors.primary};
`;

export const ButtonSearch = styled(RectButton)`
  background: ${layoutConfig.colors.secondary};
  position: absolute;
  right: 3px;
  top: 3px;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

export const SearchImage = styled.ImageBackground.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  width: 80%;
  margin: auto;
`;

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import layoutConfig from '~/config/layout';

export const ButtonContainer = styled(RectButton)`
  background: ${props => layoutConfig.colors[props.color]};
  height: 42px;
  border-radius: 21px;
  justify-content: center;
  align-items: center;
  padding: 0 21px;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#FFF',
})``;

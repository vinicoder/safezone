import styled from 'styled-components/native';

import { colors } from '~/config/layout';

export const ButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  background: ${props => colors[props.color]};
  height: 42px;
  border-radius: 21px;
  justify-content: center;
  align-items: center;
  padding: 0 21px;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: ${props => colors[props.textColor]};
  font-size: 16px;
  font-weight: bold;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#FFF',
})``;

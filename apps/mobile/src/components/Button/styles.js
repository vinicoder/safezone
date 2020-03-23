import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import layoutOptions from '~/config/layout';

export const ButtonContainer = styled(RectButton)`
  background: ${layoutOptions.colors.secondary};
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  padding: 0 18px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

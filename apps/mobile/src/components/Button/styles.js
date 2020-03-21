import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonContainer = styled(RectButton)`
  background: #ee4266;
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

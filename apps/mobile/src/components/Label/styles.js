import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '~/config/layout';

export const List = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Container = styled(RectButton)`
  background: ${colors.secondary};
  border-radius: ${props => `${props.small ? 14 : 16}px`};
  padding: 5px 16px;
  flex-direction: row;
  align-items: center;
  opacity: ${props => (props.active ? 1 : 0.6)};
`;

export const Icon = styled(MaterialIcons)`
  margin-right: 5px;
`;

export const Name = styled.Text`
  color: #fff;
  font-size: ${props => `${props.small ? 14 : 16}px`};
`;

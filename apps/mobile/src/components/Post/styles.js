import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 0 6px 12px rgba(125, 125, 125, 0.2);
  padding: 20px 30px;
  flex-direction: row;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #2a1e5c;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Labels = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const Label = styled(RectButton)`
  background: #ee4266;
  padding: 5px 15px;
  border-radius: 13px;
  border: 0;
  height: 26px;
  align-items: center;
  flex-direction: row;
`;

export const LabelText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

export const Date = styled.Text`
  font-style: italic;
  color: #a0a3a5;
  font-size: 14px;
`;

export const PostActions = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonComplaint = styled(RectButton)`
  padding: 5px;
  border-radius: 6px;
`;

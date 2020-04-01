import styled from 'styled-components/native';
import LabelDefault from '../Label';

import { colors } from '~/config/layout';

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

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 18px;
  color: ${colors.primary};
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Labels = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const Label = styled(LabelDefault)`
  margin-right: 10px;
`;

export const Date = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-style: italic;
  color: #a0a3a5;
  font-size: 12px;
`;

export const PostActions = styled.View`
  justify-content: flex-start;
  align-items: center;
`;

export const ButtonComplaint = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 6px;
`;

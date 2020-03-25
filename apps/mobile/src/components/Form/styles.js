import styled from 'styled-components/native';

import layoutConfig from '~/config/layout';

export const InputContainer = styled.View`
  margin-bottom: 10px;
`;

export const InputField = styled.TextInput.attrs({
  placeholderTextColor: '#FFFFFF',
})`
  border-radius: 21px;
  border-width: 1px;
  border-color: ${props =>
    props.error ? layoutConfig.colors.secondary : 'rgba(255, 255, 255, 0.5)'};
  font-size: 16px;
  color: #fff;
  height: 42px;
  padding: 0 20px;
`;

export const ErrorMessage = styled.Text`
  color: ${layoutConfig.colors.secondary};
  padding: 0 21px;
  font-size: 14px;
  margin-top: 5px;
`;

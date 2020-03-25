import styled from 'styled-components/native';

import * as Device from 'expo-device';

import layoutConfig from '~/config/layout';
import ButtonDefault from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Device.osName === 'iOS',
  behavior: 'padding',
})`
  background: ${layoutConfig.colors.primary};
  flex: 1;
`;

export const ContentScroll = styled.ScrollView.attrs({
  centerContent: true,
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Content = styled.View`
  padding: 30px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

export const Desc = styled.Text`
  color: #fff;
  text-align: center;
  margin: 10px 0;
`;

export const Form = styled.View`
  margin-top: 10px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#FFFFFF',
})`
  border-radius: 21px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  color: #fff;
  height: 42px;
  padding: 0 20px;
  margin-bottom: 10px;
`;

export const Button = styled(ButtonDefault)`
  margin-top: 10px;
`;

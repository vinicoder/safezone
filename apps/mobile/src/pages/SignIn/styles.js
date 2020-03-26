import styled from 'styled-components/native';
import * as Device from 'expo-device';

import layoutConfig, { colors } from '~/config/layout';
import ButtonDefault from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Device.osName === 'iOS',
  behavior: 'padding',
  keyboardVerticalOffset: layoutConfig.headerHeight,
})`
  background: ${colors.primary};
  flex: 1;
`;

export const ContentScroll = styled.ScrollView.attrs({
  centerContent: true,
  keyboardShouldPersistTaps: 'always',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})``;

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
  margin: 10px 0 20px 0;
`;

export const Button = styled(ButtonDefault)`
  margin-top: 10px;
`;

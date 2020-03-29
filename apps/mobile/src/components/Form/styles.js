import styled from 'styled-components/native';
import * as Device from 'expo-device';
import layoutConfig, { theme, colors } from '~/config/layout';
import ButtonDefault from '~/components/Button';

export const InputContainer = styled.View`
  margin-bottom: 10px;
`;

export const InputField = styled.TextInput.attrs({
  placeholderTextColor: '#FFFFFF',
})`
  border-radius: 21px;
  border-width: 1px;
  border-color: ${props =>
    props.error ? colors.secondary : 'rgba(255, 255, 255, 0.5)'};
  font-size: 16px;
  color: #fff;
  height: 42px;
  padding: 0 20px;
`;

export const InputReadonly = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  border-radius: 21px;
  border-width: 1px;
  border-color: ${props =>
    props.error ? colors.secondary : 'rgba(255, 255, 255, 0.5)'};
  height: 42px;
  padding: 0 20px;
  justify-content: center;
`;

export const InputText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ModalPicker = styled.Modal.attrs({
  animationType: 'slide',
  transparent: true,
})`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ModalPickerOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
`;

export const ModalPickerContent = styled.View`
  background: ${theme === 'dark' ? '#222' : 'white'};
`;

export const ModalPickerBar = styled.View`
  padding: 5px 30px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(155, 155, 155, 0.3);
`;

export const ModalPickerButton = styled.Button.attrs({
  color: theme === 'dark' ? 'white' : colors.primary,
})``;

export const ErrorMessage = styled.Text`
  color: ${colors.secondary};
  padding: 0 21px;
  font-size: 14px;
  margin-top: 5px;
`;

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

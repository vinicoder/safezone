import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import layoutConfig from '~/config/layout';

const { height: windowHeight } = Dimensions.get('window');
const { headerHeight, tabBarHeight } = layoutConfig;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Device.osName === 'iOS',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${windowHeight - headerHeight - tabBarHeight + 'px'};
  z-index: 2;
`;

export const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: ${layoutConfig.colors.primary};
`;

export const Content = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f2f0f9;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 15px 0;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-bottom: 15px;
  background: #f2f0f9;
`;

export const ButtonReturn = styled(RectButton)`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const InputContainer = styled.View`
  flex: 1;
  box-shadow: 0px 4px 8px rgba(155, 155, 155, 0.1);
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: layoutConfig.colors.primary,
})`
  background: #fff;
  height: 42px;
  border-radius: 21px;
  flex: 1;
  padding: 0 21px;
  font-size: 16px;
  color: ${layoutConfig.colors.primary};
`;

export const ButtonSearch = styled(RectButton)`
  background: ${layoutConfig.colors.secondary};
  position: absolute;
  right: 3px;
  top: 3px;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

export const SearchImage = styled.ImageBackground.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  width: 80%;
  height: 300px;
  margin: auto;
`;

export const SearchResults = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  width: 100%;
  padding: 0 15px;
`;

export const SearchResult = styled.View`
  width: 100%;
  border-top-width: 1px;
  border-top-color: rgba(155, 155, 155, 0.1);
  padding: 10px 0;
  flex-direction: row;
`;

export const SearchIcon = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const SearchInfo = styled.View`
  flex: 1;
`;

export const SearchResultName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 18px;
  font-weight: bold;
  color: ${layoutConfig.colors.primary};
`;

export const SearchResultDesc = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: rgba(0, 0, 0, 0.5);
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: layoutConfig.colors.primary,
})`
  margin-top: 20px;
`;

export const SearchMessage = styled.Text`
  padding: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
`;

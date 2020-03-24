import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import layoutConfig from '~/config/layout';

import ImageSearch from '~/assets/search-boy.png';
import Button from '~/components/Button';

import {
  Container,
  Overlay,
  Content,
  Header,
  ButtonReturn,
  InputContainer,
  Input,
  ButtonSearch,
  SearchImage,
} from './styles';

function Search({}, ref) {
  const { height } = Dimensions.get('window');
  const translateY = new Animated.Value(0);

  const searchInputRef = useRef();

  const open = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      searchInputRef.current.focus();
    });
  };

  async function closeHandler() {
    await searchInputRef.current.blur();
    await Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  useImperativeHandle(ref, () => ({
    open,
  }));

  return (
    <Container ref={ref} pointerEvents="box-none">
      <Overlay
        style={{
          opacity: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
        pointerEvents="box-none"
      ></Overlay>
      <Content
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Header>
          <ButtonReturn onPress={closeHandler}>
            <Icon
              name="chevron-left"
              size={16}
              color={layoutConfig.colors.primary}
            />
          </ButtonReturn>
          <InputContainer>
            <Input placeholder="Pesquisar locais" ref={searchInputRef}></Input>
            <ButtonSearch>
              <Icon name="search" size={16} color="#FFF" />
            </ButtonSearch>
          </InputContainer>
        </Header>

        <SearchImage source={ImageSearch} />
        <Button onPress={closeHandler}>Cancelar</Button>
      </Content>
    </Container>
  );
}

export default forwardRef(Search);

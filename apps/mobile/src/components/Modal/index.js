import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { Modal as RNModal, Animated } from 'react-native';

import layoutConfig from '~/config/layout';

import {
  Overlay,
  Gap,
  Container,
  Body,
  Content,
  Header,
  Title,
  Subtitle,
  Footer,
  Button,
} from './styles';

function Modal({ title, subtitle, children, onConfirm, onCancel }, ref) {
  const [visible, setVisible] = useState(false);

  const [translateY] = useState(new Animated.Value(0));

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function handleConfirm() {
    close();
    if (onConfirm) onConfirm();
  }

  function handleCancel() {
    close();
    if (onCancel) onCancel();
  }

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <RNModal ref={ref} visible={visible} transparent>
      <Overlay
        style={{
          opacity: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      />
      <Gap onPress={handleCancel} />
      <Container
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  layoutConfig.windowHeight - layoutConfig.headerHeight,
                  0,
                ],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Header>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Header>
        <Body enabled={visible}>
          <Content>{children}</Content>
        </Body>
        <Footer>
          <Button color="info" textColor="primary" onPress={handleCancel}>
            Cancelar
          </Button>
          <Button color="secondary" onPress={handleConfirm}>
            Confirmar
          </Button>
        </Footer>
      </Container>
    </RNModal>
  );
}

export default forwardRef(Modal);

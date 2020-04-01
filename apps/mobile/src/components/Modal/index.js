import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { Modal as RNModal, Animated, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

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

const Modal = forwardRef(
  (
    { title, subtitle, children, onConfirm, onCancel, cancelText, confirmText },
    ref
  ) => {
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
          <SafeAreaView>
            <Header>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
            </Header>
            {children && (
              <Body enabled={visible}>
                <Content>{children}</Content>
              </Body>
            )}
            <Footer>
              <Button color="info" textColor="primary" onPress={handleCancel}>
                {cancelText}
              </Button>
              <Button color="secondary" onPress={handleConfirm}>
                {confirmText}
              </Button>
            </Footer>
          </SafeAreaView>
        </Container>
      </RNModal>
    );
  }
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  onConfirm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
};

Modal.defaultProps = {
  subtitle: false,
  children: false,
  onConfirm: false,
  onCancel: false,
  cancelText: 'Cancelar',
  confirmText: 'Confirmar',
};

export default Modal;

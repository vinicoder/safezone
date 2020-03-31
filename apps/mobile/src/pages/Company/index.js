import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
} from 'react-native-gesture-handler';
import List, { ListSmallHeader, ListContent } from '~/components/List';
import Post from '~/components/Post';

import {
  Container,
  Header,
  HeaderInfo,
  HeaderImage,
  HeaderTitle,
  ListHeader,
  LabelItem,
  LabelList,
  HeaderSubtitle,
  HeaderSlug,
} from './styles';

function Company({ navigation }) {
  const nativeRef = useRef();
  const panRef = useRef();
  const listRef = useRef();

  let offset = 0;
  let scrolled = false;
  const translateY = new Animated.Value(0);
  const scrollY = new Animated.Value(0);

  const animationOptions = {
    duration: 200,
    useNativeDriver: true,
  };

  const animatedPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  function onHandlerStateChanged({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = nativeEvent;
      offset += translationY;
      if (translationY <= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      listRef.current.setNativeProps({
        scrollEnabled: opened,
      });

      panRef.current.setNativeProps({
        enabled: !opened,
      });

      if (!opened) {
        animationOptions.toValue = 0;
        Animated.spring(scrollY, animationOptions).start();
        listRef.current.scrollTo({ y: 0, animated: true });
      }

      animationOptions.toValue = opened ? -235 : 0;
      Animated.spring(translateY, animationOptions).start(() => {
        offset = opened ? -235 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  function onScrollHandler({ nativeEvent }) {
    const { y } = nativeEvent.contentOffset;
    if (y > 50) {
      if (!scrolled) {
        animationOptions.toValue = 64;
        Animated.spring(scrollY, animationOptions).start();
        scrolled = true;
      }
    } else {
      if (scrolled) {
        animationOptions.toValue = 0;
        Animated.spring(scrollY, animationOptions).start();
      }
      scrolled = false;
    }
  }

  function onScrollEndHandler({ nativeEvent }) {
    const { y } = nativeEvent.contentOffset;
    if (y <= 0) {
      listRef.current.setNativeProps({
        scrollEnabled: false,
      });
      panRef.current.setNativeProps({
        enabled: true,
      });
    }
  }

  const labels = [
    { id: 1, name: 'Home-office' },
    { id: 2, name: 'Fechada' },
  ];

  return (
    <Container>
      <Header
        style={{
          opacity: translateY.interpolate({
            inputRange: [-235, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              scale: translateY.interpolate({
                inputRange: [-235, 0],
                outputRange: [0.95, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <HeaderInfo>
          <HeaderSlug>Empresa</HeaderSlug>
          <HeaderTitle>Pecege</HeaderTitle>
          <HeaderSubtitle>Última atualização</HeaderSubtitle>
          <LabelList>
            {labels.map(label => (
              <LabelItem
                name={label.name}
                active={label.active}
                small
                key={label.id}
              />
            ))}
          </LabelList>
        </HeaderInfo>
        <HeaderImage />
      </Header>

      <List
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [-235, 0],
                outputRange: [-235, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <ListSmallHeader
          title="Pecege"
          subtitle="Empresa"
          style={{
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 64],
                  outputRange: [-64, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        />
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={animatedPanEvent}
          onHandlerStateChange={onHandlerStateChanged}
          shouldCancelWhenOutside={false}
          simultaneousHandlers={nativeRef}
        >
          <Animated.View style={{ flex: 1 }}>
            <NativeViewGestureHandler ref={nativeRef}>
              <ListContent
                scrollEnabled={false}
                ref={listRef}
                onScrollEndDrag={onScrollEndHandler}
                scrollEventThrottle={40}
                bounces={false}
                showsVerticalScrollIndicator={false}
                onScroll={onScrollHandler}
              >
                <ListHeader>Feed de atualizações</ListHeader>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
              </ListContent>
            </NativeViewGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </List>
    </Container>
  );
}

Company.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Company;

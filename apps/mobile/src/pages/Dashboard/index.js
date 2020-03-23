import React, { useRef } from 'react';
import { Animated } from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
} from 'react-native-gesture-handler';
import List, {
  ListHeader,
  ListSmallHeader,
  ListContent,
} from '~/components/List';
import Post from '~/components/Post';

import {
  Container,
  Header,
  HeaderInfo,
  HeaderImage,
  HeaderTitle,
  HeaderButton,
  HeaderLink,
  HeaderLinkText,
} from './styles';

export default function Home() {
  const tapRef = useRef();
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
        Animated.timing(scrollY, animationOptions).start();
        listRef.current.scrollTo({ y: 0 });
      }

      animationOptions.toValue = opened ? -235 : 0;
      Animated.timing(translateY, animationOptions).start(() => {
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
        Animated.timing(scrollY, animationOptions).start();
        scrolled = true;
      }
    } else {
      if (scrolled) {
        animationOptions.toValue = 0;
        Animated.timing(scrollY, animationOptions).start();
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
          <HeaderTitle>Situação atual das empresas na pandemia.</HeaderTitle>
          <HeaderButton>Atualize sua empresa</HeaderButton>
          <HeaderLink>
            <HeaderLinkText>Sobre o projeto</HeaderLinkText>
          </HeaderLink>
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
          title="Piracicaba"
          subtitle="Empresas em"
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
                <PanGestureHandler
                  onGestureEvent={animatedPanEvent}
                  onHandlerStateChange={onHandlerStateChanged}
                  simultaneousHandlers={[nativeRef, tapRef]}
                  shouldCancelWhenOutside={false}
                >
                  <ListHeader title="Piracicaba" subtitle="Empresas em" />
                </PanGestureHandler>
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

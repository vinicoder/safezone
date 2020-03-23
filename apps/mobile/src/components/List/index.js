import React, { forwardRef } from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import layoutOptions from '~/config/layout';

import {
  HeaderContainer,
  HeaderInfo,
  HeaderSubtitle,
  HeaderTitle,
  HeaderActions,
  ButtonLocal,
  ButtonLocalText,
  SmallHeaderContainer,
  SmallHeaderContent,
  ListContainer,
  ListContainerScroll,
  Content,
} from './styles';

function List({ children, ...rest }, ref) {
  return (
    <ListContainer {...rest} ref={ref}>
      {children}
    </ListContainer>
  );
}

export const ListHeader = forwardRef(
  ({ title, subtitle, headerActions, ...rest }, ref) => {
    return (
      <HeaderContainer {...rest} ref={ref}>
        <HeaderInfo>
          <HeaderSubtitle>{subtitle}</HeaderSubtitle>
          <HeaderTitle>{title}</HeaderTitle>
        </HeaderInfo>
        {headerActions && <HeaderActions>{headerActions}</HeaderActions>}
      </HeaderContainer>
    );
  }
);

export const ListSmallHeader = forwardRef(
  ({ title, subtitle, headerActions, ...rest }, ref) => {
    return (
      <SmallHeaderContainer pointerEvents="box-none">
        <SmallHeaderContent {...rest} elevation={1} ref={ref}>
          <HeaderInfo>
            <HeaderSubtitle small>{subtitle}</HeaderSubtitle>
            <HeaderTitle small>{title}</HeaderTitle>
          </HeaderInfo>
          {headerActions && <HeaderActions>{headerActions}</HeaderActions>}
        </SmallHeaderContent>
      </SmallHeaderContainer>
    );
  }
);

export const ListContent = forwardRef(({ children, ...rest }, ref) => {
  return (
    <ListContainerScroll {...rest} ref={ref}>
      <Content>{children}</Content>
    </ListContainerScroll>
  );
});

export const ButtonChangeLocal = ({ small, ...rest }) => {
  return (
    <ButtonLocal {...rest}>
      <Icon
        name="map-marker"
        size={24}
        color={layoutOptions.colors.secondary}
      ></Icon>
      <ButtonLocalText small={small}>Alterar local</ButtonLocalText>
    </ButtonLocal>
  );
};

export default forwardRef(List);

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { colors } from '~/config/layout';

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

const List = forwardRef(({ children, ...rest }, ref) => {
  return (
    <ListContainer {...rest} ref={ref}>
      {children}
    </ListContainer>
  );
});

export const ListHeader = forwardRef(
  ({ title, subtitle, headerActions, ...rest }, ref) => {
    return (
      <HeaderContainer {...rest} ref={ref}>
        <HeaderInfo>
          {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
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
      <Icon name="map-marker" size={24} color={colors.secondary} />
      <ButtonLocalText small={small}>Alterar local</ButtonLocalText>
    </ButtonLocal>
  );
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

ListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  headerActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

ListSmallHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  headerActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

ListHeader.defaultProps = {
  subtitle: false,
  headerActions: false,
};

ListSmallHeader.defaultProps = {
  subtitle: false,
  headerActions: false,
};

ListContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

ButtonChangeLocal.propTypes = {
  small: PropTypes.bool,
};

ButtonChangeLocal.defaultProps = {
  small: false,
};

export default List;

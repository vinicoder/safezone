import React from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

import { ButtonStyled, LinkStyled } from './styles';

export default function Button({
  children,
  to,
  type,
  theme,
  fontWeight,
  fit,
  ...props
}) {
  const childrenHy = fit ? (
    <Textfit mode="single">{children}</Textfit>
  ) : (
    children
  );
  if (to) {
    return (
      <LinkStyled {...props} to={to} theme={theme} fontWeight={fontWeight}>
        {childrenHy}
      </LinkStyled>
    );
  }
  return (
    <ButtonStyled {...props} type={type} theme={theme} fontWeight={fontWeight}>
      {childrenHy}
    </ButtonStyled>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  to: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
  fontWeight: PropTypes.string,
  fit: PropTypes.bool,
};

Button.defaultProps = {
  to: null,
  type: 'button',
  theme: null,
  fontWeight: null,
  fit: false,
};

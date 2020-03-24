import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyled, LinkStyled } from './styles';

export default function Button({
  children,
  to,
  type,
  theme,
  fontWeight,
  noBackground,
  ...props
}) {
  if (to) {
    return (
      <LinkStyled
        {...props}
        noBackground={noBackground}
        to={to}
        theme={theme}
        fontWeight={fontWeight}
      >
        {children}
      </LinkStyled>
    );
  }
  return (
    <ButtonStyled
      {...props}
      noBackground={noBackground}
      type={type}
      theme={theme}
      fontWeight={fontWeight}
    >
      {children}
    </ButtonStyled>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  to: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
  fontWeight: PropTypes.string,
};

Button.defaultProps = {
  to: null,
  type: 'button',
  theme: null,
  fontWeight: null,
};

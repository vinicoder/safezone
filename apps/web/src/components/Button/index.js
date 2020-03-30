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
  ...props
}) {
  if (to) {
    return (
      <LinkStyled {...props} to={to} theme={theme} fontWeight={fontWeight}>
        <Textfit mode="single">{children}</Textfit>
      </LinkStyled>
    );
  }
  return (
    <ButtonStyled {...props} type={type} theme={theme} fontWeight={fontWeight}>
      <Textfit mode="single">{children}</Textfit>
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

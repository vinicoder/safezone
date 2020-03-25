import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer, ButtonText, Loader } from './styles';

function Button({ children, color, loading, ...rest }) {
  return (
    <ButtonContainer color={color} {...rest}>
      {loading ? <Loader /> : <ButtonText>{children}</ButtonText>}
    </ButtonContainer>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  color: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  color: 'secondary',
};

export default Button;

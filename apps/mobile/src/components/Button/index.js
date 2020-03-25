import React from 'react';
import { ButtonContainer, ButtonText, Loader } from './styles';

export default function Button({
  children,
  color = 'secondary',
  loading,
  ...rest
}) {
  return (
    <ButtonContainer color={color} {...rest}>
      {loading ? <Loader /> : <ButtonText>{children}</ButtonText>}
    </ButtonContainer>
  );
}

import React from 'react';
import { ButtonContainer, ButtonText } from './styles';

export default function Button({ children, color = 'secondary', ...rest }) {
  return (
    <ButtonContainer color={color} {...rest}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}

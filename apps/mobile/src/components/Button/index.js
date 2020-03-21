import React from 'react';

import { ButtonContainer, ButtonText } from './styles';

export default function Button({ children, ...rest }) {
  return (
    <ButtonContainer {...rest}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}

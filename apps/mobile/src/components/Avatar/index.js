import React from 'react';

import { ButtonContainer, AvatarContainer } from './styles';

import AvatarImage from '~/assets/avatar.png';

export default function Avatar({ ...rest }) {
  return (
    <ButtonContainer {...rest}>
      <AvatarContainer source={AvatarImage} />
    </ButtonContainer>
  );
}

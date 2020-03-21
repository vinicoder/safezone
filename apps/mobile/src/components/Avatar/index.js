import React from 'react';

import { ButtonContainer, AvatarContainer } from './styles';

import AvatarImage from '~/assets/avatar.png';

export default function Avatar() {
  return (
    <ButtonContainer>
      <AvatarContainer source={AvatarImage}></AvatarContainer>
    </ButtonContainer>
  );
}

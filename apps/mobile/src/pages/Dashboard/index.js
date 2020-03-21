import React from 'react';

import {
  Container,
  Header,
  HeaderInfo,
  HeaderImage,
  HeaderTitle,
  HeaderButton,
  HeaderLink,
  HeaderLinkText,
} from './styles';

export default function Home() {
  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Situação atual das empresas na pandemia.</HeaderTitle>
          <HeaderButton>Atualize sua empresa</HeaderButton>
          <HeaderLink>
            <HeaderLinkText>Sobre o projeto</HeaderLinkText>
          </HeaderLink>
        </HeaderInfo>
        <HeaderImage />
      </Header>
    </Container>
  );
}

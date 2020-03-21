import React from 'react';
import logoVertical from 'images/logo-vertical.svg';
import heroImage from 'images/hero-image.svg';

import { Container, Header, ShapedLink, UserProfileButton } from './styles';

function Home() {
  return (
    <Container>
      <Header>
        <img src={logoVertical} alt="Logo SAFEZONE" />

        <nav>
          <li>
            <ShapedLink>Sobre o projeto</ShapedLink>
          </li>

          <li>
            <ShapedLink primary strong>
              Consultar Empresas
            </ShapedLink>
          </li>

          <li>
            <UserProfileButton>User</UserProfileButton>
          </li>
        </nav>
      </Header>

      <section className="flex-container hero">
        <div className="box-description-hero">
          <h1>Situação atual das empresas na pandemia.</h1>

          <p>Consulte as medidas tomadas pelas empresas da sua região</p>

          <ShapedLink primary strong>
            Atualize sua empresa
          </ShapedLink>
        </div>
        <div className="box-image-hero">
          <img src={heroImage} alt="Imagem demonstrativa" srcSet="" />
        </div>
      </section>

      {/*
      <section>
        <div>
          <div>
            Empresas em <strong>Piracicaba</strong>
            <div>
              <i>I</i>
              Alterar local
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div>
          Ajude-nos a manter a plataforma. <strong>Faça uma doação.</strong>
        </div>
        <div>
          Deseja contribuir com o projeto?{' '}
          <strong>Acesse o repositório no GitHub</strong>
        </div>
      </footer>
    */}
    </Container>
  );
}

export default Home;

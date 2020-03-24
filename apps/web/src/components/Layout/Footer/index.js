import React from 'react';

import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
          <div className="col col-md-5">
            Ajude-nos a manter a plataforma. <strong>Faça uma doação.</strong>
          </div>
          <div className="col col-md-5">
            Deseja contribuir com o projeto?{' '}
            <strong>Acesse o repositório no GitHub</strong>
          </div>
        </div>
      </div>
    </Container>
  );
}

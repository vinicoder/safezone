import React from 'react';

import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
          <div className="col col-md-5">
            Ajude-nos a manter a plataforma.{' '}
            <a rel="noopener noreferrer" target="_blank" href="http://">
              <strong>Faça uma doação.</strong>
            </a>
          </div>
          <div className="col col-md-5">
            Deseja contribuir com o projeto?{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/vinicoder/safezone"
            >
              <strong>Acesse o repositório no GitHub</strong>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

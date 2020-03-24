import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import Button from 'components/Button';
import logoVertical from 'images/logo-vertical.svg';

import { Container, UserProfileButton } from './styles';

export default function Header() {
  return (
    <Container>
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
          <div className="col col-md-10 d-flex justify-content-md-between">
            <Link to="/">
              <img src={logoVertical} alt="Logo SAFEZONE" />
            </Link>

            <nav>
              <li>
                <Button to="/sobre" theme="secondary">
                  Sobre o projeto
                </Button>
              </li>

              <li>
                <Button to="/" theme="primary" fontWeight="bold">
                  Consultar Empresas
                </Button>
              </li>
              <li>
                <Link to="/entrar">
                  <UserProfileButton>
                    <FontAwesomeIcon icon={faUser} />
                  </UserProfileButton>
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';

import Button from 'components/Button';
import logoVertical from 'images/logo-vertical.svg';
import { Container } from './styles';

export default function Header() {
  const signed = useSelector(state => state.auth.signed);
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
                <Button
                  theme="primary"
                  fontWeight="bold"
                  onClick={() =>
                    scroller.scrollTo('scroll-to-map', {
                      duration: 800,
                      delay: 0,
                      smooth: 'easeInOutQuart',
                    })
                  }
                >
                  Consultar Empresas
                </Button>
              </li>
              <li>
                {signed ? (
                  <Button to="/logout" theme="secondary">
                    Logout
                  </Button>
                ) : (
                  <Button to="/entrar" theme="secondary">
                    Entrar
                  </Button>
                )}
              </li>
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
}

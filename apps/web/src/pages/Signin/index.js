import React from 'react';

import aboutImage from 'images/about-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';

import { Container, FormSection, FormContainer } from './styles';

function Signin() {
  return (
    <Container>
      <Header />
      <FormSection>
        <div className="container my-5">
          <div className="row justify-content-md-center align-items-center">
            <div className="col-12 col-md-5">
              <img src={aboutImage} alt="Imagem sobre o projeto" />
            </div>
            <div className="col-12 col-md-5">
              <FormContainer>
                <h1>Acesse sua conta</h1>
                <p>
                  Para atualizar o cadastro de alguma empresa, é necessário
                  estar conectado.
                </p>
                <Button className="mb-2" to="/entrar" theme="rose">
                  Entrar
                </Button>
                <Button className="mb-2" to="/entrar" theme="secondary">
                  Criar minha Conta
                </Button>
                <Button className="mb-2" to="/entrar" theme="primary">
                  Esqueceu sua senha?
                </Button>
              </FormContainer>
            </div>
          </div>
        </div>
      </FormSection>
      <Footer />
    </Container>
  );
}

export default Signin;

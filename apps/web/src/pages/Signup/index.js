import React from 'react';
import { Form } from '@unform/web';

import heroImage from 'images/hero-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Input from 'components/Form/Input';

import { Container, FormSection, FormContainer } from './styles';

function Signup() {
  function handleSubmit(values) {
    console.log('values', values);
  }
  return (
    <Container>
      <Header />
      <FormSection>
        <div className="container my-5">
          <div className="row justify-content-md-center align-items-center">
            <div className="col-12 col-md-5">
              <img src={heroImage} alt="Imagem sobre o projeto" />
            </div>
            <div className="col-12 col-md-5">
              <FormContainer>
                <Form onSubmit={handleSubmit}>
                  <h1 className="mb-2">Criar minha conta</h1>
                  <p className="mb-4">Forneça seus dados corretamente.</p>
                  <Input type="text" name="name" placeholder="Nome completo" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-mail de acesso"
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Senha de acesso"
                  />
                  <Input
                    type="text"
                    name="birthday"
                    placeholder="Data de nascimento"
                  />
                  <Input type="text" name="gender" placeholder="Gênero" />

                  <p className="mb-3">
                    Ao clicar em &quot;Criar minha conta&quot; você concordará
                    com os <strong>termos de uso</strong> da plataforma.
                  </p>

                  <Button
                    className="mb-2"
                    to="/entrar"
                    fontWeight="bold"
                    theme="persian_green"
                  >
                    Criar minha Conta
                  </Button>
                  <Button
                    className="mb-2"
                    to="/entrar"
                    fontWeight="bold"
                    theme="primary"
                  >
                    Já tenho conta
                  </Button>
                </Form>
              </FormContainer>
            </div>
          </div>
        </div>
      </FormSection>
      <Footer />
    </Container>
  );
}

export default Signup;

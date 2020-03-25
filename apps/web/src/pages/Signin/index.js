import React from 'react';
import { Form } from '@unform/web';
import { useDispatch, useSelector } from 'react-redux';

import aboutImage from 'images/about-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Input from 'components/Form/Input';

import { signInRequest } from 'store/modules/auth/actions';

import { Container, FormSection, FormContainer } from './styles';

function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(values) {
    console.log('values', values);

    dispatch(signInRequest(values.email, values.password));
  }

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
                <Form onSubmit={handleSubmit}>
                  <h1 className="mb-2">Acesse sua conta</h1>
                  <p className="mb-4">
                    Para atualizar o cadastro de alguma empresa, é necessário
                    estar conectado.
                  </p>
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
                  <Button
                    loading={loading}
                    style={{ width: '100%' }}
                    type="submit"
                    className="mb-2"
                    fontWeight="bold"
                    theme="rose"
                  >
                    Entrar
                  </Button>
                  <Button
                    className="mb-2"
                    to="/criar-conta"
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
                    Esqueceu sua senha?
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

export default Signin;

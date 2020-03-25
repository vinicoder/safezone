import React, { useState } from 'react';
import { Form } from '@unform/web';

import aboutImage from 'images/about-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Input from 'components/Form/Input';

import { Container, FormSection, FormContainer } from './styles';

function RecoverPassword() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(values) {
    console.log('values', values);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
                  <h1 className="mb-2">Recuperação de conta</h1>
                  <p className="mb-4">
                    Recupere sua conta usando seu e-mail de acesso.
                  </p>
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-mail de acesso"
                  />
                  <Button
                    style={{ width: '100%' }}
                    type="submit"
                    className="mb-2"
                    fontWeight="bold"
                    theme="rose"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Recuperar'}
                  </Button>
                  <Button
                    className="mb-2"
                    to="/entrar"
                    fontWeight="bold"
                    theme="primary"
                  >
                    Lembrou sua senha?
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

export default RecoverPassword;

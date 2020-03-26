import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import aboutImage from 'images/about-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Input from 'components/Form/Input';
import StyledForm from 'components/Form/StyledForm';

import { signInRequest } from 'store/modules/auth/actions';

import { Container, FormSection, FormContainer } from './styles';

function Signin() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit(values) {
    console.log('values', values);

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Por favor, digite seu e-mail corretamente')
          .required('Por favor, digite o seu email'),
        password: Yup.string().required('Por favor, digite sua senha'),
      });
      await schema.validate(values, {
        abortEarly: false,
      });
      // Validation passed
      console.log(values);

      dispatch(signInRequest(values.email, values.password));
    } catch (err) {
      const validationErrors = {};
      console.log('err', err);
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
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
                <StyledForm ref={formRef} onSubmit={handleSubmit}>
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
                    style={{ width: '100%' }}
                    type="submit"
                    className="my-2"
                    fontWeight="bold"
                    theme="rose"
                    disabled={loading}
                  >
                    {loading ? 'Autenticando...' : 'Entrar'}
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
                    to="/recuperar-conta"
                    fontWeight="bold"
                    theme="primary"
                  >
                    Esqueceu sua senha?
                  </Button>
                </StyledForm>
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

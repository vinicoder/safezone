import React from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import heroImage from 'images/hero-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Input from 'components/Form/Input';

import {
  Container,
  FormSection,
  FormContainer,
  TermsContainer,
} from './styles';

const SweetAle = withReactContent(Swal);

function Signup() {
  async function handleSubmit(data) {
    try {
      let accepted = false;
      await SweetAle.fire({
        width: '50%',
        padding: '3em',
        html: (
          <TermsContainer>
            <h1>Termos de Uso</h1>
            <p className="subtitle">Leia atentameto os termos.</p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </TermsContainer>
        ),
        footer: (
          <>
            <Button
              fontWeight="bold"
              onClick={() => SweetAle.close()}
              style={{ marginRight: 10 }}
            >
              Cancelar
            </Button>
            <Button
              theme="rose"
              fontWeight="bold"
              onClick={() => {
                accepted = true;
                SweetAle.close();
              }}
              style={{ marginLeft: 10 }}
            >
              Aceito
            </Button>
          </>
        ),
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
      });

      console.log('accepted', accepted);

      if (accepted) {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .email()
            .required(),
          password: Yup.string()
            .min(6)
            .required(),
          birthday: Yup.string().required(),
          gender: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
        console.log(data);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err);
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
                    type="submit"
                    className="mb-2"
                    // to="/entrar"
                    fontWeight="bold"
                    theme="persian_green"
                    style={{ width: '100%' }}
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

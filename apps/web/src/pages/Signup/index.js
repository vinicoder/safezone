import React, { useRef } from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';

import heroImage from 'images/hero-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import { Form } from 'components/Form/StyledForm/styles';
import Input from 'components/Form/Input';
import Datepicker from 'components/Form/Datepicker';
import ReactSelect from 'components/Form/ReactSelect';

import { signUpRequest } from 'store/modules/auth/actions';
import {
  Container,
  FormSection,
  FormContainer,
  TermsContainer,
} from './styles';

const SweetAle = withReactContent(Swal);

function Signup() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const gendersLoading = useSelector(state => state.genders.loading);
  const genders = useSelector(state =>
    state.genders.data.map(gender => ({
      ...gender,
      value: gender.id,
      label: gender.description,
    }))
  );

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

      if (accepted) {
        const schema = Yup.object().shape({
          name: Yup.string().required('Por favor, digite o seu nome'),
          email: Yup.string()
            .email('Por favor, digite um e-mail válido')
            .required('Por favor, digite o seu email'),
          password: Yup.string()
            .min(6, 'Por favor, digite uma senha 6 caracts.')
            .required('Por favor, digite uma senha segura'),
          birthday: Yup.date()
            .max(new Date(), 'Você não pode ter nascimento no futuro!')
            .required('Por favor, informe sua data de nasc.')
            .typeError('Por favor, informe uma data válida'),
          gender: Yup.number().required('Por favor, informe seu genero'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
        dispatch(
          signUpRequest(
            data.name,
            data.email,
            data.password,
            data.birthday,
            data.gender
          )
        );
      }
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
              <img src={heroImage} alt="Imagem sobre o projeto" />
            </div>
            <div className="col-12 col-md-5">
              <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
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
                  <Datepicker
                    dateFormat="dd/MM/yyyy"
                    name="birthday"
                    locale="pt-BR"
                    maxDate={new Date()}
                    placeholderText="Data de nascimento"
                  />
                  <ReactSelect
                    defaultValue={null}
                    name="gender"
                    placeholder="Gênero"
                    options={genders}
                    loading={gendersLoading}
                  />

                  <p className="my-3">
                    Ao clicar em &quot;Criar minha conta&quot; você concordará
                    com os <strong>termos de uso</strong> da plataforma.
                  </p>

                  <Button
                    type="submit"
                    className="mb-2"
                    fontWeight="bold"
                    theme="persian_green"
                    style={{ width: '100%' }}
                    disabled={loading}
                  >
                    {loading ? 'Criando sua conta...' : 'Criar minha Conta'}
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

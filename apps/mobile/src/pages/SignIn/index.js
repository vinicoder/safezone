import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Form/Input';

import {
  Container,
  Content,
  ContentScroll,
  Title,
  Desc,
  Button,
} from '~/components/Form/styles';

function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      const { email, password } = data;

      dispatch(signInRequest(email, password));

      setLoading(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
          formRef.current.clearField(error.path);
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container pointerEvents={loading ? 'none' : 'auto'}>
      <ContentScroll>
        <Content>
          <Title>Acesse sua conta</Title>
          <Desc>
            Para atualizar o cadastro de alguma empresa, é necessário estar
            conectado.
          </Desc>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="username"
              autoCapitalize="none"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() =>
                formRef.current.getFieldRef('password').focus()
              }
            />
            <Input
              name="password"
              autoCorrect={false}
              autoCompleteType="password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current.submitForm()}
            />
            <Button
              onPress={() => formRef.current.submitForm()}
              loading={loading}
            >
              Entrar
            </Button>
            <Button
              color="success"
              onPress={() => navigation.navigate('SignUp')}
            >
              Criar minha conta
            </Button>
            <Button color="primary">Esqueceu sua senha?</Button>
          </Form>
        </Content>
      </ContentScroll>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;

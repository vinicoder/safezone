import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import { subYears } from 'date-fns';
import * as Yup from 'yup';

import Input from '~/components/Form/Input';
import DatePicker from '~/components/Form/DatePicker';

import {
  Container,
  Content,
  ContentScroll,
  Title,
  Desc,
  Button,
} from '~/components/Form/styles';

function SignUp({ navigation }) {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        birthday: Yup.date()
          .required('Data de nascimento obrigatória')
          .typeError('Data de nascimento obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

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
          <Title>Criar minha conta</Title>
          <Desc>Forneça seus dados corretamente.</Desc>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Nome completo"
              autoCorrect={false}
              autoCompleteType="name"
              returnKeyType="next"
              onSubmitEditing={() =>
                formRef.current.getFieldRef('birthday').focus()
              }
            />
            <DatePicker
              name="birthday"
              placeholder="Data de nascimento"
              display="spinner"
              minimumDate={subYears(new Date(), 100)}
              maximumDate={subYears(new Date(), 16)}
              onSubmitEditing={() =>
                formRef.current.getFieldRef('gender').focus()
              }
            />
            <Input
              name="gender"
              placeholder="Gênero"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() =>
                formRef.current.getFieldRef('email').focus()
              }
            />
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
              color="success"
              onPress={() => formRef.current.submitForm()}
              loading={loading}
            >
              Criar minha conta
            </Button>
            <Button
              color="primary"
              onPress={() => navigation.navigate('SignIn')}
            >
              Já tenho conta
            </Button>
          </Form>
        </Content>
      </ContentScroll>
    </Container>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;

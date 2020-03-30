import React, { useRef, useState } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import { subYears } from 'date-fns';
import * as Yup from 'yup';

import Input from '~/components/Form/Input';
import DatePicker from '~/components/Form/DatePicker';
import Select from '~/components/Form/Select';

import Modal from '~/components/Modal';

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
  const modalRef = useRef(null);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string()
          .min(6, 'Mínimo de 6 caracteres')
          .required('Senha obrigatória'),
        birthday: Yup.date()
          .required('Data de nascimento obrigatória')
          .typeError('Data de nascimento obrigatória'),
        gender: Yup.number()
          .required('Selecione um gênero')
          .typeError('Selecione um gênero'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      modalRef.current.open();
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

            <Select
              name="gender"
              placeholder={{ label: 'Gênero', value: 0 }}
              items={[
                { label: 'Masculino', value: 1 },
                { label: 'Feminino', value: 2 },
                { label: 'Outros', value: 3 },
              ]}
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
      <Modal
        ref={modalRef}
        title="Termos de Uso"
        subtitle="Leia atentamente os termos"
        onConfirm={() => navigation.navigate('Profile')}
        onCancel={() => setLoading(false)}
      >
        <Text>
          <Text style={{ marginBottom: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </Text>
      </Modal>
    </Container>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import { subYears } from 'date-fns';
import * as Yup from 'yup';

import Input from '~/components/Form/Input';
import DatePicker from '~/components/Form/DatePicker';
import Select from '~/components/Form/Select';

import {
  Container,
  Content,
  ContentScroll,
  Title,
  Desc,
  Button,
} from '~/components/Form/styles';

function Profile({ navigation }) {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string()
          .transform(value => (value === '' ? undefined : value))
          .min(6, 'Mínimo de 6 caracteres')
          .nullable(),
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

  const initialData = {
    name: 'Vinicius de Moraes',
    birthday: '1991-12-10T00:00:00-03:00',
    gender: 1,
    email: 'vinicoder@gmail.com',
  };

  return (
    <Container pointerEvents={loading ? 'none' : 'auto'}>
      <ContentScroll>
        <Content>
          <Title>Atualizar conta</Title>
          <Desc>Mantenha seus dados sempre atualizados.</Desc>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
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
              placeholder="Nova senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current.submitForm()}
            />

            <Button
              color="secondary"
              onPress={() => formRef.current.submitForm()}
              loading={loading}
            >
              Salvar informações
            </Button>
            <Button color="primary" onPress={() => {}}>
              Sair
            </Button>
          </Form>
        </Content>
      </ContentScroll>
    </Container>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;

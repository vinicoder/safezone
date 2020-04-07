import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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

import { signOut } from '~/store/modules/auth/actions';
import {
  updateProfileStart,
  updateProfileRequest,
} from '~/store/modules/user/actions';

function Profile({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);

  const formRef = useRef(null);

  useEffect(() => {
    dispatch(updateProfileStart());
  }, []);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido'),
        birth_date: Yup.date().typeError('Data de nascimento obrigatória'),
        gender_id: Yup.number().typeError('Selecione um gênero'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      await dispatch(updateProfileRequest(data));

      setTimeout(() => {
        navigation.goBack();
      }, 250);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
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
          <Title>Atualizar conta</Title>
          <Desc>Mantenha seus dados sempre atualizados.</Desc>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={profile}>
            <Input
              name="name"
              placeholder="Nome completo"
              autoCorrect={false}
              autoCompleteType="name"
              returnKeyType="next"
              onSubmitEditing={() =>
                formRef.current.getFieldRef('birth_date').focus()
              }
            />
            <DatePicker
              name="birth_date"
              placeholder="Data de nascimento"
              display="spinner"
              minimumDate={subYears(new Date(), 100)}
              maximumDate={subYears(new Date(), 16)}
              onSubmitEditing={() =>
                formRef.current.getFieldRef('gender_id').focus()
              }
            />

            <Select
              name="gender_id"
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

            <Button
              color="secondary"
              onPress={() => formRef.current.submitForm()}
              loading={loading}
            >
              Salvar informações
            </Button>
            <Button
              color="info"
              textColor="primary"
              onPress={() => navigation.navigate('App', { page: 'Password' })}
            >
              Alterar senha
            </Button>
            <Button color="primary" onPress={() => dispatch(signOut())}>
              Sair da conta
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

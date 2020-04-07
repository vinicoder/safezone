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

function Password({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const formRef = useRef(null);

  useEffect(() => {
    dispatch(updateProfileStart());
  }, []);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        oldPassword: Yup.string().required('Senha antiga é obrigatório'),
        password: Yup.string()
          .min(6, 'Mínimo de 6 caracteres')
          .required('Senha é obrigatório'),
        confirmPassword: Yup.string()
          .when('password', (password, field) =>
            password ? field.oneOf([Yup.ref('password')]) : field
          )
          .required('Confirmação de senha é obrigatório'),
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
          <Title>Atualizar senha</Title>
          <Desc>Atenção para os dados cadastrados.</Desc>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={profile}>
            <Input
              name="oldPassword"
              autoCorrect={false}
              autoCompleteType="password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Senha antiga"
              returnKeyType="send"
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
              onSubmitEditing={() =>
                formRef.current.getFieldRef('confirmPassword').focus()
              }
            />

            <Input
              name="confirmPassword"
              autoCorrect={false}
              autoCompleteType="password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Confirmar senha"
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
            <Button color="primary" onPress={() => navigation.goBack()}>
              Cancelar
            </Button>
          </Form>
        </Content>
      </ContentScroll>
    </Container>
  );
}

Password.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Password;

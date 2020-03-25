import React from 'react';
import { Form } from '@unform/mobile';

import {
  Container,
  Content,
  ContentScroll,
  Title,
  Desc,
  //Form,
  Input,
  Button,
} from './styles';

export default function Login() {
  return (
    <Container>
      <ContentScroll>
        <Content>
          <Title>Acesse sua conta</Title>
          <Desc>
            Para atualizar o cadastro de alguma empresa, é necessário estar
            conectado.
          </Desc>
          <Form>
            <Input
              name="email"
              textContentType="emailAddress"
              placeholder="E-mail de acesso"
            ></Input>
            <Input
              name="password"
              textContentType="password"
              secureTextEntry={true}
              placeholder="Senha de acesso"
            ></Input>
            <Button>Entrar</Button>
            <Button color="success">Criar minha conta</Button>
            <Button color="primary">Esqueceu sua senha?</Button>
          </Form>
        </Content>
      </ContentScroll>
    </Container>
  );
}

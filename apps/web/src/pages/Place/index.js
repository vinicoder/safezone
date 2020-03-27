import React, { useRef } from 'react';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import CompanyBox from 'components/CompanyBox';
import Button from 'components/Button';
import StyledForm from 'components/Form/StyledForm';
import Input from 'components/Form/Input';
import Checkbox from 'components/Form/Checkbox';
import formImage from 'images/form-image.svg';

import { Container, PlaceSection, Title, Count, Tag } from './styles';

function Place() {
  const formRef = useRef(null);

  async function handleSubmit(values) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        company_name: Yup.string().required(
          'Por favor, digite o nome da empresa'
        ),
      });
      await schema.validate(values, {
        abortEarly: false,
      });
      // Validation passed
      console.log(values);
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
      <PlaceSection>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-md-5 px-4">
              <Title>Empresa</Title>
              <Title>Lorem Ipsum</Title>

              <Count>2 atualizações registradas</Count>

              <div className="tag-list">
                <ul>
                  {['home-office', 'fechada'].map(status => (
                    <Tag key={status}>{status}</Tag>
                  ))}
                </ul>
              </div>

              <div className="form-container">
                <img
                  src={formImage}
                  width="350"
                  alt="Imagem ilustrativa no formulário"
                />
                <StyledForm ref={formRef} onSubmit={handleSubmit}>
                  <h3>Atualizar estado</h3>
                  <Input
                    type="text"
                    name="company_name"
                    placeholder="Nome da Empresa"
                  />
                  <div className="title-situations mb-2">
                    Selecione as situações
                  </div>
                  <Scope path="situations">
                    <ul className="situations">
                      <Checkbox name="home_office" label="Home-office" />
                      <Checkbox name="closed" label="Fechada" />
                      <Checkbox
                        name="reduction_employees"
                        label="Menos colaboradores"
                      />
                      <Checkbox name="less_hours" label="Horas reduzidas" />
                      <Checkbox
                        name="vacation_time"
                        label={`Colaboradores em "férias"`}
                      />
                    </ul>
                  </Scope>
                  <p className="message">
                    <strong>Lembre-se: </strong>é muito importante de que as
                    informações enviadas sejam verídicas.
                  </p>
                  <Button
                    type="submit"
                    style={{ width: '100%' }}
                    fontWeight="bold"
                    theme="rose"
                  >
                    Enviar atualização
                  </Button>
                </StyledForm>
              </div>
            </div>
            <div className="col col-md-5">
              <div className="py-2 px-4">
                <h4>Últimas atualizações</h4>

                {/* List */}
                <CompanyBox key={`company-${1}`} />
                <CompanyBox key={`company-${2}`} />
                <CompanyBox key={`company-${3}`} />
                <CompanyBox key={`company-${4}`} />
                <CompanyBox key={`company-${5}`} />
                <CompanyBox key={`company-${6}`} />
              </div>
            </div>
          </div>
        </div>
      </PlaceSection>
      <Footer />
    </Container>
  );
}

export default Place;

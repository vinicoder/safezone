import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from 'components/Form/Input';
import Checkbox from 'components/Form/Checkbox';
import Select from 'components/Form/Select';
import Button from 'components/Button';

import logoVertical from 'images/logo-vertical.svg';
import heroImage from 'images/hero-image.svg';
import aboutImage from 'images/about-image.svg';
import formImage from 'images/form-image.svg';

import { Scope } from '@unform/core';
import {
  Container,
  Header,
  HeroSection,
  AboutSection,
  MapSection,
  FormSection,
  UserProfileButton,
  CompanyList,
  CompanyBox,
  Tag,
  Footer,
} from './styles';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MapMarkerIcon = ({ size = '6x' }) => (
  <FontAwesomeIcon
    size={size}
    color="rgb(238, 66, 102)"
    icon={faMapMarkerAlt}
  />
);

function Home() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.log(data);
    } catch (err) {
      const validationErrors = {};
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
      <Header>
        <div className="container">
          <div className="row justify-content-md-center align-items-center">
            <div className="col col-md-10 d-flex justify-content-md-between">
              <img src={logoVertical} alt="Logo SAFEZONE" />

              <nav>
                <li>
                  <Button to="/" theme="secondary">
                    Sobre o projeto
                  </Button>
                </li>

                <li>
                  <Button to="/" theme="primary" fontWeight="bold">
                    Consultar Empresas
                  </Button>
                </li>
                <li>
                  <UserProfileButton>
                    <FontAwesomeIcon icon={faUser} />
                  </UserProfileButton>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </Header>

      <HeroSection>
        <div className="container">
          <div className="row justify-content-md-center align-items-center">
            <div className="col col-md-5">
              <h1>Situação atual das empresas na pandemia.</h1>

              <p>Consulte as medidas tomadas pelas empresas da sua região</p>

              <div className="row">
                <div className="col col-sm-7">
                  <Button to="/" theme="rose" fontWeight="bold">
                    Atualize sua empresa
                  </Button>
                </div>
              </div>
            </div>
            <div className="col col-md-5">
              <img src={heroImage} alt="Imagem demonstrativa" srcSet="" />
            </div>
          </div>
        </div>
      </HeroSection>

      <MapSection>
        <div className="companies">
          <div className="description">
            <span className="header-list">
              Empresas em <br /> <strong>Piracicaba</strong>
            </span>
            <div>
              <MapMarkerIcon size="lg" /> Alterar local
            </div>
          </div>
          <CompanyList>
            {Array(10)
              .fill(null)
              .map((item, index) => (
                <CompanyBox key={`company-${index}`}>
                  <div className="title">Empresa Lorem Ipsum Dolor{index}</div>
                  <div className="tag-list">
                    <ul>
                      {['home-office', 'fechada'].map(status => (
                        <Tag key={status}>home-office</Tag>
                      ))}
                    </ul>
                  </div>
                  <div className="updated-info">
                    Atualizado em 18/03/2020 às 12:30
                  </div>
                </CompanyBox>
              ))}
          </CompanyList>
        </div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCmWArZHnZJjWjJGgBNNQLwgklP0Z81fg4',
            }}
            defaultCenter={{
              lat: 59.95,
              lng: 30.33,
            }}
            defaultZoom={10}
          >
            <MapMarkerIcon
              size="3x"
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </MapSection>

      <AboutSection>
        <div className="container">
          <div className="row justify-content-lg-center align-items-center">
            <div className="col-sm-12 col-lg-5">
              <img src={aboutImage} alt="Imagem sobre o projeto" />
            </div>
            <div className="col-sm-12 col-lg-5">
              <h3>Sobre o projeto</h3>
              <p className="sub-title">
                Por que atualizar o estado atual das empresas é tão importante?
              </p>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <div className="row">
                <div className="col col-sm-7">
                  <Button to="/" theme="rose" fontWeight="bold">
                    Atualize sua empresa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AboutSection>

      <FormSection>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-md-5">
              <h4>Atualize sua empresa</h4>
            </div>
            <div className="col col-md-5">
              <img src={formImage} alt="Imagem ilustrativa no formulário" />
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-md-center mb-4">
              <div className="col col-md-5">
                <div className="form-title">Informações do seu perfil</div>
                <Input name="name" type="text" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="E-mail" />
                <Input name="password" type="password" placeholder="Senha" />
                <div className="row">
                  <div className="col col-xs-6">
                    <Input
                      name="text"
                      type="text"
                      placeholder="Data de nascimento"
                    />
                  </div>
                  <div className="col col-xs-6">
                    <Select
                      defaultValue={null}
                      name="gender"
                      placeholder="Gênero"
                    >
                      <option value={null} style={{ display: 'none' }}>
                        Gênero
                      </option>
                      <option value="feminino">Feminino</option>
                      <option value="masculino">Masculino</option>
                      <option value="outro">Outro</option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col col-md-5">
                <div className="form-title">Informações da empresa</div>
                <Input name="name" type="text" placeholder="Nome da Empresa" />
                <div className="row">
                  <div className="col-12">
                    <div className="title-situations">
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className="remember">
                      Lembre-se: é muito importante de que as informações
                      enviadas sejam verídicas.
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="terms">
                      Ao clicar em &quot;Enviar atualização&quot; você estará
                      criando a sua conta e concordará com os termos de uso da
                      plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-md-center">
              <Button type="submit" theme="rose" fontWeight="bold">
                Enviar atualização
              </Button>
            </div>
          </Form>
        </div>
      </FormSection>

      <Footer>
        <div className="container">
          <div className="row justify-content-md-center align-items-center">
            <div className="col col-md-5">
              Ajude-nos a manter a plataforma. <strong>Faça uma doação.</strong>
            </div>
            <div className="col col-md-5">
              Deseja contribuir com o projeto?{' '}
              <strong>Acesse o repositório no GitHub</strong>
            </div>
          </div>
        </div>
      </Footer>
    </Container>
  );
}

export default Home;

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import InputUnstyled from 'components/Form/Input/InputUnstyled';
import Input from 'components/Form/Input';
import Checkbox from 'components/Form/Checkbox';
import StyledForm from 'components/Form/StyledForm';
import Button from 'components/Button';
import CompanyBox from 'components/CompanyBox';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Datepicker from 'components/Form/Datepicker';
import ReactSelect from 'components/Form/ReactSelect';

import heroImage from 'images/hero-image.svg';
import aboutImage from 'images/about-image.svg';
import formImage from 'images/form-image.svg';
import searchImage from 'images/search-image.svg';

import maps from 'config/maps';
import mapsApi from 'services/maps';

import {
  Container,
  HeroSection,
  AboutSection,
  MapSection,
  FormSection,
  CompanyList,
  SearchInput,
} from './styles';

const MapMarkerIcon = ({ size = '6x' }) => (
  <FontAwesomeIcon
    size={size}
    color="rgb(238, 66, 102)"
    icon={faMapMarkerAlt}
  />
);

const genderOptions = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'outro', label: 'Outro' },
];

function Home() {
  const formRef = useRef(null);
  const searchPlaceFormRef = useRef(null);
  const [searchPlaceMode, setSearchPlaceMode] = useState(false);
  const [latitude, setLatitude] = useState(-22.725);
  const [longitude, setLongitude] = useState(-47.6476);

  async function getPosition() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log('position', position);
      },
      err => console.log(err)
    );
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        company_name: Yup.string().required(
          'Por favor, digite o nome da empresa'
        ),
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
        gender: Yup.string().required('Por favor, informe seu genero'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.log(data);
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

  function handleSearchSubmit(values) {
    // https://maps.googleapis.com/maps/api/place/
    // findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY
    mapsApi
      .get(`place/details/json?input=${values.search}`)
      .then(resp => console.log(resp));
  }

  return (
    <Container>
      <Header />

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
          {searchPlaceMode ? (
            <>
              <div className="description">
                <span className="header-list">
                  Empresas em <br /> <strong>Piracicaba</strong>
                </span>
                <div>
                  <Button
                    style={{ padding: 0, background: 'rgba(224,222,231,12%)' }}
                    onClick={() => setSearchPlaceMode(true)}
                    noBackground
                  >
                    <MapMarkerIcon size="lg" /> Alterar local
                  </Button>
                </div>
              </div>
              <CompanyList>
                {Array(10)
                  .fill(null)
                  .map((item, index) => (
                    <CompanyBox key={`company-${index}`} />
                  ))}
              </CompanyList>
            </>
          ) : (
            <>
              <div className="my-5">
                <Form ref={searchPlaceFormRef} onSubmit={handleSearchSubmit}>
                  <SearchInput className="mb-5">
                    <InputUnstyled
                      type="search"
                      aria-labelledby="search-button"
                      placeholder="Pesquise pelo local"
                      name="search"
                    />
                    <div className="icon">
                      <FontAwesomeIcon
                        size="1x"
                        color="rgb(255, 255, 255)"
                        icon={faSearch}
                        onClick={() => searchPlaceFormRef.current.submitForm()}
                      />
                    </div>
                  </SearchInput>
                </Form>
                <img src={searchImage} alt="Imagem ilustrativa de pesquisa" />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  theme="blue_haze"
                  onClick={() => setSearchPlaceMode(false)}
                  fontWeight="bold"
                >
                  Cancelar
                </Button>
                <Button theme="rose" fontWeight="bold" onClick={getPosition}>
                  Selecão automática
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: maps.apiKey,
            }}
            defaultCenter={{
              lat: latitude,
              lng: longitude,
            }}
            defaultZoom={10}
          >
            <MapMarkerIcon
              size="3x"
              lat={-22.725}
              lng={-47.64767844}
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
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <div className="row justify-content-md-center mb-5">
              <div className="col col-md-5">
                <div className="form-title">Informações do seu perfil</div>
                <Input name="name" type="text" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="E-mail" />
                <Input name="password" type="password" placeholder="Senha" />
                <div className="row">
                  <div className="col col-xs-6">
                    <Datepicker
                      name="birthday"
                      locale="pt-BR"
                      maxDate={new Date()}
                      placeholderText="Data de nascimento"
                    />
                  </div>
                  <div className="col col-xs-6">
                    <ReactSelect
                      defaultValue={null}
                      name="gender"
                      placeholder="Gênero"
                      options={genderOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="col col-md-5">
                <div className="form-title">Informações da empresa</div>
                <Input
                  name="company_name"
                  type="text"
                  placeholder="Nome da Empresa"
                />
                <div className="row mt-2">
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
          </StyledForm>
        </div>
      </FormSection>

      <Footer />
    </Container>
  );
}

export default Home;

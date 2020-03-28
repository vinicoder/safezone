/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
// import useSWR from 'swr';

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

import useSupercluster from 'use-supercluster';
import {
  Container,
  HeroSection,
  AboutSection,
  MapSection,
  FormSection,
  CompanyList,
  SearchInput,
  SearchResults,
  SearchResult,
  SearchIcon,
  SearchInfo,
  SearchResultDesc,
  SearchResultName,
  SearchMessage,
} from './styles';

const MapMarkerIcon = ({ size = '6x', color }) => (
  <FontAwesomeIcon
    size={size}
    color={color || 'rgb(238, 66, 102)'}
    icon={faMapMarkerAlt}
  />
);

const Marker = ({ children }) => children;

const genderOptions = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'outro', label: 'Outro' },
];

function Home() {
  const formRef = useRef(null);
  const searchPlaceFormRef = useRef(null);
  const [searchPlaceMode, setSearchPlaceMode] = useState(true);
  const [cities, setCities] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map setup
  const mapRef = useRef();
  const mapsRef = useRef();
  const [latitude, setLatitude] = useState(-22.725);
  const [longitude, setLongitude] = useState(-47.6476);
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);

  // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=PIRACICABA&key=AIzaSyCmWArZHnZJjWjJGgBNNQLwgklP0Z81fg4&types=(cities)&language=pt-BR`;
  // const fetcher = fetchUrl => fetch(fetchUrl).then(response => response.json());
  // const { data, error } = useSWR(url, fetcher);
  // const companies = data && !error ? data.predictions : [];

  const points = [].map(company => ({
    type: 'Feature',
    properties: {
      id: company.id,
      cluster: false,
      companyId: company.id,
      category: company.category,
      description: company.description,
      place_id: company.place_id,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(company.location.longitude),
        parseFloat(company.location.latitude),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        mapRef.current.setZoom(10);

        const posToSet = new mapsRef.current.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        mapRef.current.setCenter(posToSet);
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
    setLoading(true);
    mapsApi
      .get(`place/autocomplete/json?input=${values.search}&types=(cities)`)
      .then(({ data }) => {
        setCities(data.predictions);
        setWasSearched(true);
        setLoading(false);
      });
  }

  function emptyComponent() {
    if (loading) return <SearchMessage>Carregando...</SearchMessage>;

    if (cities.length) return null;

    if (wasSearched && cities.length === 0) {
      return <SearchMessage>Nenhum resultado encontrado.</SearchMessage>;
    }

    return <img src={searchImage} alt="Imagem ilustrativa de pesquisa" />;
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
          {!searchPlaceMode ? (
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
              <div className="my-5" style={{ height: 450 }}>
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
                {emptyComponent()}
                <SearchResults>
                  {!loading &&
                    cities.map(city => (
                      <SearchResult key={city.place_id}>
                        <SearchIcon>
                          <MapMarkerIcon size="2x" color="#999" />
                        </SearchIcon>
                        <SearchInfo>
                          <SearchResultName>
                            {city.structured_formatting.main_text}
                          </SearchResultName>
                          <SearchResultDesc>
                            {city.description}
                          </SearchResultDesc>
                        </SearchInfo>
                      </SearchResult>
                    ))}
                </SearchResults>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  theme="blue_haze"
                  onClick={() => {
                    setSearchPlaceMode(false);
                    setCities([]);
                    setWasSearched(false);
                  }}
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
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              mapRef.current = map;
              mapsRef.current = maps;
            }}
            bootstrapURLKeys={{
              key: maps.apiKey,
              language: maps.language,
            }}
            defaultCenter={{
              lat: latitude,
              lng: longitude,
            }}
            defaultZoom={10}
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
              ]);
            }}
          >
            {clusters.map(cluster => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const {
                cluster: isCluster,
                point_count: pointCount,
              } = cluster.properties;

              if (isCluster) {
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div
                      className="cluster-marker"
                      style={{
                        width: `${10 + (pointCount / points.length) * 20}px`,
                        height: `${10 + (pointCount / points.length) * 20}px`,
                      }}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              }

              return (
                <Marker
                  key={`company-${cluster.properties.companyId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <button
                    type="button"
                    className="company-marker"
                    onClick={() => console.log(cluster)}
                  >
                    <MapMarkerIcon size="2x" />
                  </button>
                </Marker>
              );
            })}
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

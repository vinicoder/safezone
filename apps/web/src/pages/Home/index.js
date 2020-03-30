import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Element, scroller } from 'react-scroll';

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

import mapsApi from 'services/maps';
import Gmaps from 'components/Gmaps';
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

function Home() {
  const formRef = useRef(null);
  const searchPlaceFormRef = useRef(null);
  const [searchPlaceMode, setSearchPlaceMode] = useState(true);
  const [cities, setCities] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loadingAutoPosition, setLoadingAutoPosition] = useState(false);
  const gendersLoading = useSelector(state => state.genders.loading);
  const genders = useSelector(state =>
    state.genders.data.map(gender => ({
      ...gender,
      value: gender.id,
      label: gender.description,
    }))
  );

  const labelsLoading = useSelector(state => state.labels.loading);
  const labels = useSelector(state =>
    state.labels.data.map(label => ({
      ...label,
      value: label.id,
      label: label.description,
    }))
  );

  // Map setup
  const gmapRef = useRef();

  function handleSelectCity(city) {
    setSelectedCity(city);
    setSearchPlaceMode(false);
    setCities([]);
    setWasSearched(false);
    setLoading(false);
  }

  function getCityByGeoCoordinates(lat, lng) {
    const mapsRef = gmapRef.current.getInstanceMaps();
    const geocoder = new mapsRef.Geocoder();

    const latlng = new mapsRef.LatLng(lat, lng);

    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status === mapsRef.GeocoderStatus.OK) {
        if (results[1]) {
          // find city type
          const foundCity = results.find(result =>
            result.types.includes('locality')
          );

          handleSelectCity({
            ...foundCity,
            description: foundCity.address_components[0].long_name,
            name: foundCity.address_components[0].short_name,
            place_id: foundCity.place_id,
            reference: foundCity.place_id,
            types: foundCity.types,
          });

          setLoadingAutoPosition(false);
        } else {
          console.warn('No results found');
          setLoadingAutoPosition(false);
        }
      } else {
        setLoadingAutoPosition(false);
        alert(`Geocoder failed due to: ${status}`);
      }
    });
  }

  function setPositionMap(lati, long) {
    const mapRef = gmapRef.current.getInstanceMap();
    const mapsRef = gmapRef.current.getInstanceMaps();
    mapRef.setZoom(12);

    const posToSet = new mapsRef.LatLng(lati, long);
    mapRef.setCenter(posToSet);
  }

  function getPosition() {
    setLoadingAutoPosition(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        setPositionMap(position.coords.latitude, position.coords.longitude);
        getCityByGeoCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      err => {
        setLoadingAutoPosition(false);
        console.log(err);
      }
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
        setCities(
          data.predictions.map(predic => ({
            ...predic,
            name: predic.structured_formatting.main_text,
          }))
        );
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
                  <Button
                    fontWeight="bold"
                    theme="rose"
                    onClick={() =>
                      scroller.scrollTo('scroll-to-form', {
                        duration: 800,
                        delay: 0,
                        smooth: 'easeInOutQuart',
                      })
                    }
                  >
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

      <Element name="scroll-to-map">
        <MapSection>
          <div id="mapsection" className="companies">
            {!searchPlaceMode ? (
              <>
                <div className="description">
                  <span className="header-list">
                    Empresas em <br />{' '}
                    <strong>{selectedCity && selectedCity.name}</strong>
                  </span>
                  <div>
                    <Button
                      style={{
                        padding: 0,
                        background: 'rgba(224,222,231,12%)',
                      }}
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
                          onClick={() =>
                            searchPlaceFormRef.current.submitForm()
                          }
                        />
                      </div>
                    </SearchInput>
                  </Form>
                  {emptyComponent()}
                  <SearchResults>
                    {!loading &&
                      cities.map(city => (
                        <SearchResult
                          key={city.place_id}
                          onClick={() => {
                            handleSelectCity(city);

                            mapsApi
                              .get(`place/details/json`, {
                                params: {
                                  place_id: city.place_id,
                                },
                              })
                              .then(({ data }) => {
                                console.log('data.result', data.result);

                                setPositionMap(
                                  data.result.geometry.location.lat,
                                  data.result.geometry.location.lng
                                );
                              });
                          }}
                        >
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
                <div className="d-flex justify-content-around align-items-center">
                  {selectedCity && (
                    <Button
                      disabled={loadingAutoPosition}
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
                  )}
                  <Button
                    disabled={loadingAutoPosition}
                    className=" ld-ext-left"
                    theme="rose"
                    fontWeight="bold"
                    onClick={getPosition}
                  >
                    {loadingAutoPosition
                      ? 'Localizando...'
                      : 'Selecão automática'}
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="map">
            <Gmaps ref={gmapRef} city={selectedCity} />
          </div>
        </MapSection>
      </Element>

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
                  <Button
                    theme="rose"
                    fontWeight="bold"
                    onClick={() =>
                      scroller.scrollTo('scroll-to-form', {
                        duration: 800,
                        delay: 0,
                        smooth: 'easeInOutQuart',
                      })
                    }
                  >
                    Atualize sua empresa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AboutSection>

      <Element name="scroll-to-form">
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
                        dateFormat="dd/MM/yyyy"
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
                        loading={gendersLoading}
                        options={genders}
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
                          {labelsLoading && 'Carregando dados...'}
                          {labels.map(lb => (
                            <Checkbox
                              key={lb.id}
                              name={`checkbox-${lb.id}`}
                              label={lb.description}
                            />
                          ))}
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
      </Element>

      <Footer />
    </Container>
  );
}

export default Home;

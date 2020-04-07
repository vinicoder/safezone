import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Element, scroller } from 'react-scroll';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';

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

import api from 'services/api';

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

const SweetAle = withReactContent(Swal);

const MapMarkerIcon = ({ size = '6x', color }) => (
  <FontAwesomeIcon
    size={size}
    color={color || 'rgb(238, 66, 102)'}
    icon={faMapMarkerAlt}
  />
);

const debounce = (fn, ms = 0) => {
  let timeoutId;
  // eslint-disable-next-line func-names
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

function Home() {
  const formRef = useRef(null);
  const searchPlaceFormRef = useRef(null);
  const [searchPlaceMode, setSearchPlaceMode] = useState(true);
  const [cities, setCities] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loadingAutoPosition, setLoadingAutoPosition] = useState(false);
  const auth = useSelector(state => state.auth);
  const profile = useSelector(state => state.user.profile);
  const [formLoading, setFormLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [points, setPoints] = useState([]);
  const gendersLoading = useSelector(state => state.genders.loading);
  const mapOptions = entity => ({
    ...entity,
    value: entity.id,
    label: entity.description,
  });
  const genders = useSelector(state => state.genders.data.map(mapOptions));
  const [labelsError, setLabelsError] = useState(null);
  const labelsLoading = useSelector(state => state.labels.loading);
  const labels = useSelector(state => state.labels.data.map(mapOptions));
  const history = useHistory();

  // Map setup
  const gmapRef = useRef();

  function handleSelectCity(city) {
    setSelectedCity(city);
    setSearchPlaceMode(false);
    setCities([]);
    setWasSearched(false);
    setLoading(false);
  }

  function promisefyGetCityByGeoCoordinates(lat, lng) {
    return new Promise((resolve, reject) => {
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

            resolve({
              ...foundCity,
              description: foundCity.address_components[0].long_name,
              name: foundCity.address_components[0].short_name,
              place_id: foundCity.place_id,
              reference: foundCity.place_id,
              types: foundCity.types,
            });
          } else {
            console.warn('No results found');
            reject(new Error('No results found'));
          }
        } else {
          console.error(`Geocoder failed due to: ${status}`);
          reject(new Error(`Geocoder failed due to: ${status}`));
        }
      });
    });
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

  async function getDetails(companyPlaceId) {
    const { data } = await mapsApi.get('/place/details/json', {
      params: {
        place_id: companyPlaceId,
        fields: 'name,geometry',
      },
    });

    const { result } = data;
    const { name, geometry } = result;
    const { location } = geometry;
    return { place_id: companyPlaceId, name, location };
  }

  async function afterSubmitForm(data) {
    let accepted = false;

    await SweetAle.fire({
      width: '50%',
      padding: '3em',
      html: (
        <div>
          <h1>Deu tudo certo!</h1>
          <p className="subtitle">Sua contribuição fez a diferença!</p>
        </div>
      ),
      footer: (
        <>
          {/* <Button
            fontWeight="bold"
            onClick={() => SweetAle.close()}
            style={{ marginRight: 10 }}
          >
            Fechar
          </Button> */}
          <Button
            theme="rose"
            fontWeight="bold"
            onClick={() => {
              accepted = true;
              SweetAle.close();
            }}
            style={{ marginLeft: 10 }}
          >
            Continuar
          </Button>
        </>
      ),
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    console.log(accepted);
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setLabelsError(null);

      setFormLoading(true);

      data.labels =
        data.situations &&
        Object.keys(data.situations)
          .filter(key => data.situations[key])
          .map(numb => Number(numb));

      const personSchema = {
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
      };
      const companySchema = {
        company: Yup.string().required(
          'Por favor, selecione o nome da empresa'
        ),
        labels: Yup.array()
          .of(Yup.number())
          .required('Por favor, selecione informe a situação da empresa'),
      };

      const schemaToValidate = Object.assign(
        companySchema,
        !auth.signed ? personSchema : null
      );

      const schema = Yup.object().shape(schemaToValidate);

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.log(data);

      const companyDetails = await getDetails(data.company);

      const cityDetails = await promisefyGetCityByGeoCoordinates(
        companyDetails.location.lat,
        companyDetails.location.lng
      );
      const dataToPost = {
        labels: data.labels,
        company: {
          ...companyDetails,
          city_place_id: cityDetails.place_id,
        },
        user: !auth.signed && {
          name: data.name,
          email: data.email,
          password: data.password,
          birth_date: data.birthday,
          gender_id: data.gender,
        },
      };

      console.log('dataToPost', dataToPost);

      const { data: respData } = await api.post(
        '/companies/associations/events/labels',
        dataToPost
      );

      afterSubmitForm(respData);
    } catch (err) {
      console.log('err', err);
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setLabelsError(validationErrors.labels);
        formRef.current.setErrors(validationErrors);
      }
    } finally {
      setFormLoading(false);
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

  async function loadOptions(inputValue, callback) {
    const { data } = await mapsApi.get('/place/autocomplete/json', {
      params: {
        input: inputValue,
        types: 'establishment',
        origin: '-12.085643,-52.627011',
        location: '-12.085643,-52.627011',
        radius: 2446000,
        strictbounds: true,
      },
    });

    const { predictions } = data;
    callback(
      predictions.map(predic => ({
        ...predic,
        value: predic.place_id,
        label: predic.structured_formatting.main_text,
      }))
    );
  }

  useEffect(() => {
    if (selectedCity && selectedCity.place_id) {
      api
        .post('/cities', {
          city_place_id: selectedCity && selectedCity.place_id,
        })
        .then(({ data: companiesAddress }) => {
          setCompanies(companiesAddress);
          const pointss = companiesAddress.map(address => ({
            type: 'Feature',
            properties: {
              id: address.id,
              cluster: false,
              companyId: address.id,
              category: address.category,
              description: address.company.name,
              place_id: address.place_id,
            },
            geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(address.longitude),
                parseFloat(address.latitude),
              ],
            },
          }));
          setPoints(pointss);
        });
    }
  }, [selectedCity]);

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
                    fit
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
                  {companies.map(item => (
                    <CompanyBox
                      key={`${item.id}`}
                      requestURL={`/companies/associations/events/labels/${item.company.id}`}
                      name={item.company.name}
                      funcToFormatTags={label => ({
                        id: label.id,
                        description: label.labels.description,
                      })}
                      updatedAt={item.company.updatedAt}
                      onClick={() => {
                        history.push(`/empresa/${item.company.id}`);
                      }}
                    />
                  ))}
                </CompanyList>
              </>
            ) : (
              <>
                <div className="my-3" style={{ height: 450 }}>
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
                    fit
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
            <Gmaps ref={gmapRef} points={points} />
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
              <div className="col col-md-5 col-sm-12">
                <h4>Atualize sua empresa</h4>
              </div>
              <div className="col col-md-5 col-sm-12">
                <img src={formImage} alt="Imagem ilustrativa no formulário" />
              </div>
            </div>
            <StyledForm ref={formRef} onSubmit={handleSubmit}>
              <div className="row justify-content-md-center mb-5">
                <div className="col col-md-5 col-sm-12">
                  <div className="form-title">Informações do seu perfil</div>
                  {auth.signed ? (
                    <>
                      <input type="text" value={profile.name} readOnly />
                      <input type="text" value={profile.email} readOnly />
                    </>
                  ) : (
                    <>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Nome completo"
                      />
                      <Input name="email" type="email" placeholder="E-mail" />
                      <Input
                        name="password"
                        type="password"
                        placeholder="Senha"
                      />
                      <div className="row">
                        <div className="col col-sm-12 col-md-6">
                          <Datepicker
                            dateFormat="dd/MM/yyyy"
                            name="birthday"
                            locale="pt-BR"
                            maxDate={new Date()}
                            placeholderText="Data de nascimento [05/04/2020]"
                          />
                        </div>
                        <div className="col col-sm-12 col-md-6">
                          <ReactSelect
                            defaultValue={null}
                            name="gender"
                            placeholder="Gênero"
                            loading={gendersLoading}
                            options={genders}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col col-md-5">
                  <div className="form-title">Informações da empresa</div>
                  <ReactSelect
                    name="company"
                    placeholder="Nome da Empresa"
                    async
                    cacheOptions
                    loadOptions={debounce(loadOptions, 500)}
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
                              name={lb.id}
                              label={lb.description}
                            />
                          ))}
                        </ul>
                      </Scope>
                      {labelsError}
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
                <Button
                  type="submit"
                  theme="rose"
                  fontWeight="bold"
                  disabled={formLoading}
                >
                  {formLoading ? 'Enviando...' : 'Enviar atualização'}
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

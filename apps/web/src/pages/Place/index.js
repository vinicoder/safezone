import React, { useRef, useState, useEffect } from 'react';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import CompanyBox from 'components/CompanyBox';
import Button from 'components/Button';
import StyledForm from 'components/Form/StyledForm';
import Checkbox from 'components/Form/Checkbox';
import ReactSelect from 'components/Form/ReactSelect';
import formImage from 'images/form-image.svg';

import api from 'services/api';
import mapsApi from 'services/maps';
import {
  Container,
  PlaceSection,
  Title,
  Count,
  Tag,
  DenunciationContainer,
} from './styles';

const SweetAle = withReactContent(Swal);

const debounce = (fn, ms = 0) => {
  let timeoutId;
  // eslint-disable-next-line func-names
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

function Place() {
  const formRef = useRef(null);
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [company, setCompany] = useState({});
  const history = useHistory();
  const [labelsError, setLabelsError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const mapOptions = entity => ({
    ...entity,
    value: entity.id,
    label: entity.description,
  });
  const labelsLoading = useSelector(state => state.labels.loading);
  const labels = useSelector(state => state.labels.data.map(mapOptions));

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

  async function promisefyGetCityByGeoCoordinates(lat, lng) {
    try {
      const {
        data: { results },
      } = await mapsApi.get('/geocode/json', {
        params: {
          latlng: `${lat},${lng}`,
        },
      });

      if (results[1]) {
        // find city type
        const foundCity = results.find(result =>
          result.types.includes('locality')
        );

        return {
          ...foundCity,
          description: foundCity.address_components[0].long_name,
          name: foundCity.address_components[0].short_name,
          place_id: foundCity.place_id,
          reference: foundCity.place_id,
          types: foundCity.types,
        };
      }
      console.warn('No results found');
      return new Error('No results found');
    } catch (error) {
      return new Error(`Geocoder failed due to: ${error}`);
    }
  }

  async function handleSubmit(values) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setFormLoading(true);
      values.labels =
        values.situations &&
        Object.keys(values.situations)
          .filter(key => values.situations[key])
          .map(numb => Number(numb));

      const schema = Yup.object().shape({
        company: Yup.string().required(
          'Por favor, selecione o nome da empresa'
        ),
        labels: Yup.array()
          .of(Yup.number())
          .required('Por favor, selecione informe a situação da empresa'),
      });
      await schema.validate(values, {
        abortEarly: false,
      });
      // Validation passed
      // console.log(values);

      const companyDetails = await getDetails(values.company);

      const cityDetails = await promisefyGetCityByGeoCoordinates(
        companyDetails.location.lat,
        companyDetails.location.lng
      );

      const dataToPost = {
        labels: values.labels,
        company: {
          ...companyDetails,
          city_place_id: cityDetails.place_id,
        },
      };

      const { data: respData } = await api.post(
        '/companies/associations/events/labels',
        dataToPost
      );

      history.go(`/empresa/${respData.company.id}`);
    } catch (err) {
      const validationErrors = {};
      console.log('err', err);
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        setLabelsError(validationErrors.labels);
      }
    } finally {
      setFormLoading(false);
    }
  }

  async function handleClickCompanyState(company) {
    let accepted = false;

    await SweetAle.fire({
      width: '50%',
      padding: '3em',
      html: (
        <DenunciationContainer>
          <h1>Denunciar</h1>
          <p className="subtitle">
            Se você não concorda com essa atualização, confirme sua solicitação.
          </p>
        </DenunciationContainer>
      ),
      footer: (
        <>
          <Button
            fontWeight="bold"
            onClick={() => SweetAle.close()}
            style={{ marginRight: 10 }}
          >
            Cancelar
          </Button>
          <Button
            theme="rose"
            fontWeight="bold"
            onClick={() => {
              accepted = true;
              SweetAle.close();
            }}
            style={{ marginLeft: 10 }}
          >
            Denunciar
          </Button>
        </>
      ),
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
    });

    console.log('accepted', accepted);
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
    api.get(`/companies/associations/events/labels/${id}`).then(({ data }) => {
      setTags(
        data.map(label => ({
          id: label.id,
          description: label.labels.description,
        }))
      );
    });
    api.get(`/companies/${id}`).then(({ data }) => {
      console.log('data', data);
      setCompany(data.company);
    });
  }, [id]);

  return (
    <Container>
      <Header />
      <PlaceSection>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-md-5 px-4">
              <Title>{company.name}</Title>
              {company.description && <Title>{company.description}</Title>}

              <Count>{tags.length} atualizações registradas</Count>

              <div className="tag-list">
                <ul>
                  {tags.map(tag => (
                    <Tag key={tag.id}>{tag.description}</Tag>
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
                  <ReactSelect
                    name="company"
                    placeholder="Nome da Empresa"
                    async
                    cacheOptions
                    loadOptions={debounce(loadOptions, 500)}
                  />
                  <div className="title-situations mb-2">
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
                    {labelsError}
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
                    disabled={formLoading}
                  >
                    {formLoading ? 'Enviando...' : 'Enviar atualização'}
                  </Button>
                </StyledForm>
              </div>
            </div>
            <div className="col col-md-5">
              <div className="py-2 px-4">
                <h4>Últimas atualizações</h4>

                {/* List */}
                <CompanyBox
                  key={`company-${1}`}
                  onClick={() =>
                    handleClickCompanyState({ id: 1, name: 'company' })
                  }
                />
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

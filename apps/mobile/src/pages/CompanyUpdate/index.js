import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ContentLoader from 'react-native-easy-content-loader';

import { ActivityIndicator } from 'react-native';
import api from '~/services/api';

import Search from '~/components/Search';

import {
  Container,
  Content,
  ContentScroll,
  Button,
  InputReadonly,
  InputText,
  ErrorMessage,
} from '~/components/Form/styles';

import {
  LabelList,
  LabelItem,
  Header,
  HeaderTitle,
  HeaderInfo,
  HeaderImage,
  Info,
  TextStrong,
  InputTitle,
} from './styles';

function CompanyUpdate({ navigation }) {
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingLabels, setLoadingLabels] = useState(true);

  const [errs, setErrs] = useState([]);
  const [company, setCompany] = useState({});
  const [labels, setLabels] = useState([]);

  async function handlePressItem(item) {
    setCompany(item);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const labelsSelected = labels
        .filter((label) => label.active)
        .map((label) => label.id);
      const data = { company, labels: labelsSelected };

      const schema = Yup.object().shape({
        company: Yup.object().shape({
          location: Yup.object().shape({
            lat: Yup.number().required(),
            lng: Yup.number().required(),
          }),
          name: Yup.string().required('Selecione uma empresa'),
          place_id: Yup.string().required(),
        }),
        labels: Yup.array()
          .min(1, 'Selecione pelo menos uma situação')
          .of(Yup.number()),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setErrs([]);

      api.post('/companies/associations/events/labels').then(({ data }) => {
        navigation.navigate('App', { page: 'Company' });
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        setErrs(errorMessages);
      }
    }
    setLoading(false);
  }

  function handleLabel(id) {
    const labelsChanged = labels.map((label) =>
      label.id === id ? { ...label, active: !label.active } : label
    );
    setLabels(labelsChanged);
  }

  useEffect(() => {
    async function loadLabels() {
      await api.get('/labels').then(({ data }) => {
        const labelsChanged = data.map((label) => {
          return { ...label, active: false };
        });
        setLabels(labelsChanged);
      });
      setLoadingLabels(false);
    }

    loadLabels();
  }, []);

  return (
    <Container pointerEvents={loading ? 'none' : 'auto'}>
      <ContentScroll>
        <Content>
          <Header>
            <HeaderInfo>
              <HeaderTitle>Atualize sua empresa</HeaderTitle>
            </HeaderInfo>
            <HeaderImage />
          </Header>

          {labels.length > 0 ? (
            <>
              <InputTitle>Selecione uma empresa</InputTitle>
              <InputReadonly
                onPress={() => searchRef.current.open()}
                error={errs && errs['company.name']}
              >
                <InputText>
                  {(company && company.name) || 'Nome da empresa'}
                </InputText>
              </InputReadonly>
              {errs && errs['company.name'] && (
                <ErrorMessage style={{ paddingLeft: 0 }}>
                  {errs['company.name']}
                </ErrorMessage>
              )}

              <InputTitle>Situações da empresa</InputTitle>
              <LabelList>
                {labels.map((label) => (
                  <LabelItem
                    name={label.description}
                    hasIcon
                    active={label.active}
                    key={label.id}
                    onPress={() => handleLabel(label.id)}
                  />
                ))}
              </LabelList>
              {errs && errs.labels && (
                <ErrorMessage style={{ paddingLeft: 0 }}>
                  {errs.labels}
                </ErrorMessage>
              )}
            </>
          ) : (
            <ContentLoader
              loading={loadingLabels}
              active
              primaryColor={'rgba(220, 220, 220, 1)'}
              secondaryColor={'rgba(220, 220, 220, .8)'}
              tHeight={35}
              pHeight={20}
              pWidth={'100%'}
              tWidth={'100%'}
              containerStyles={{
                opacity: 0.3,
                paddingHorizontal: 0,
              }}
              titleStyles={{
                borderRadius: 17,
              }}
              paragraphStyles={{
                borderRadius: 10,
              }}
            />
          )}

          <Info>
            <TextStrong>Lembre-se:</TextStrong> é muito importante de que as
            informações enviadas sejam verídicas.
          </Info>

          <Button color="success" onPress={handleSubmit} loading={loading}>
            Enviar atualização
          </Button>
          <Button color="primary" onPress={() => navigation.goBack()}>
            Cancelar
          </Button>
        </Content>
      </ContentScroll>
      <Search
        ref={searchRef}
        placeholder="Pesquisar empresas"
        filter="establishment"
        onPressItem={handlePressItem}
      />
    </Container>
  );
}

CompanyUpdate.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default CompanyUpdate;

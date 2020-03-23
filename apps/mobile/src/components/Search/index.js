import React from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';
import layoutConfig from '~/config/layout';

import ImageSearch from '~/assets/search-boy.png';
import Button from '~/components/Button';

import {
  Container,
  Header,
  SearchHeader,
  ButtonReturn,
  InputContainer,
  Input,
  ButtonSearch,
  SearchImage,
} from './styles';

export default function Search() {
  return (
    <Container>
      <Header>
        <ButtonReturn>
          <Icon
            name="chevron-left"
            size={16}
            color={layoutConfig.colors.primary}
          />
        </ButtonReturn>
        <InputContainer>
          <Input placeholder="Pesquisar locais"></Input>
          <ButtonSearch>
            <Icon name="search" size={16} color="#FFF" />
          </ButtonSearch>
        </InputContainer>
      </Header>

      <SearchImage source={ImageSearch} />
      <Button>Cancelar</Button>
    </Container>
  );
}

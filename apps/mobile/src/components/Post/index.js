import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';

import { colors } from '~/config/layout';

import {
  Container,
  Info,
  Title,
  Labels,
  Label,
  LabelText,
  Date,
  PostActions,
  ButtonComplaint,
} from './styles';

export default function Post() {
  return (
    <Container elevation={1}>
      <Info>
        <Title>Empresa Lorem Ipsum</Title>
        <Labels>
          <Label>
            <LabelText>home-office</LabelText>
          </Label>
        </Labels>
        <Date>Publicado em 18/03/2020 às 12:30</Date>
      </Info>
      <PostActions>
        <ButtonComplaint onPress={() => {}}>
          <Icon name="flag" size={22} color={colors.secondary} />
        </ButtonComplaint>
      </PostActions>
    </Container>
  );
}

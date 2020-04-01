import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { colors } from '~/config/layout';

import Complaint from '../Complaint';

import {
  Container,
  Info,
  Title,
  Labels,
  Label,
  Date,
  PostActions,
  ButtonComplaint,
} from './styles';

export default function Post({ item, onPress }) {
  const complaintRef = useRef(null);

  return (
    <Container elevation={1}>
      <Info>
        {item && (
          <TouchableOpacity onPress={onPress}>
            <Title>Empresa Lorem Ipsum</Title>
          </TouchableOpacity>
        )}
        <Labels>
          <Label name="home-office" small />
        </Labels>
        <Date>Publicado em 18/03/2020 às 12:30</Date>
      </Info>
      <PostActions>
        <ButtonComplaint onPress={() => complaintRef.current.open()}>
          <Icon name="flag" size={22} color={colors.secondary} />
        </ButtonComplaint>
      </PostActions>
      <Complaint ref={complaintRef} postId={0} />
    </Container>
  );
}

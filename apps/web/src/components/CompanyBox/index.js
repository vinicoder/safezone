import React from 'react';

import { Container, Tag } from './styles';

export default function CompanyBox({ name, tags, updated_at }) {
  console.log('name, tags, updated_at', name, tags, updated_at);
  return (
    <Container>
      <div className="title">Empresa Lorem Ipsum Dolor</div>
      <div className="tag-list">
        <ul>
          {['home-office', 'fechada'].map(status => (
            <Tag key={status}>home-office</Tag>
          ))}
        </ul>
      </div>
      <div className="updated-info">Atualizado em 18/03/2020 às 12:30</div>
    </Container>
  );
}

import React, { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import { ptBR } from 'date-fns/locale';
import api from 'services/api';
import { Container, Tag } from './styles';

export default function CompanyBox({
  onClick,
  requestURL,
  funcToFormatTags,
  name,
  updatedAt,
}) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.get(requestURL).then(({ data }) => {
      setTags(data.map(funcToFormatTags));
    });
  }, []);

  return (
    <Container onClick={onClick}>
      <div className="title">{name}</div>
      <div className="tag-list">
        <ul>
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.description}</Tag>
          ))}
        </ul>
      </div>
      {updatedAt && (
        <div className="updated-info">
          Atualizado{' '}
          {formatDistanceToNow(parseISO(updatedAt), {
            addSuffix: true,
            locale: ptBR,
          })}
          {/* 18/03/2020 às 12:30 */}
        </div>
      )}
    </Container>
  );
}

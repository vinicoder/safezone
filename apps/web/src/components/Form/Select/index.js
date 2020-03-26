import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function Select({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </Container>
  );
}

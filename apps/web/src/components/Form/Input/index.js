import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import { Container } from './styles';

export default function Input({ name, label, className, ...rest }) {
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
      {label && <label htmlFor={name}>{label}</label>}

      <input
        ref={inputRef}
        defaultValue={defaultValue}
        className={(error ? 'has-error ' : '') + className}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  className: '',
};

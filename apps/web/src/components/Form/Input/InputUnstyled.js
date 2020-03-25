import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';

export default function InputUnstyled({ name, label, className, ...rest }) {
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
    <>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        ref={inputRef}
        defaultValue={defaultValue}
        className={(error ? 'has-error ' : '') + className}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
}

InputUnstyled.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

InputUnstyled.defaultProps = {
  label: null,
  className: '',
};

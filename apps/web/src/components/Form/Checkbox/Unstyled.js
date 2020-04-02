import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

export default function Checkbox({
  name,
  label,
  addonPosition,
  className,
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  const randomId = Math.random() + name;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <label className="input-checked" htmlFor={randomId}>
      {addonPosition === 'right' && label}{' '}
      <input
        type="checkbox"
        ref={inputRef}
        id={randomId}
        className={(error ? 'has-error' : '') + className}
        defaultValue={defaultValue}
        {...rest}
      />{' '}
      {addonPosition === 'left' && label}
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  addonPosition: PropTypes.string,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  addonPosition: 'left',
  className: '',
};

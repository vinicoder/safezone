import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import CheckboxShaped from './styles';

export default function Checkbox({ name, label, className, ...rest }) {
  const [checked, setChecked] = useState(false);
  const inputRef = useRef(null);
  const { fieldName, defaultValue = false, registerField, error } = useField(
    name
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  const handleCheckboxChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <CheckboxShaped
      ref={inputRef}
      className={(error ? 'has-error' : '') + className}
      defaultValue={defaultValue}
      checked={checked}
      onChange={handleCheckboxChange}
      {...rest}
    >
      <span style={{ marginLeft: 5 }}>{label}</span>
    </CheckboxShaped>
  );
}

Checkbox.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
};

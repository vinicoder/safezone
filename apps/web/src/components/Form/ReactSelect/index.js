import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

const Select = ({ name, className = '', ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }

        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        className={(error ? 'has-error ' : '') + className}
        classNamePrefix="react-select"
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
};
export default Select;

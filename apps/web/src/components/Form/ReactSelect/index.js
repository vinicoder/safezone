import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import { useField } from '@unform/core';

const Select = ({ name, className = '', async, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (async) {
          const { value } = ref.select.state;
          if (rest.isMulti) {
            if (!value) {
              return [];
            }
            return value.map(option => option.value);
          }

          if (!value) {
            return '';
          }
          return value.value;
        }

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
  }, [fieldName, registerField, async, rest.isMulti]);
  return (
    <>
      {async && (
        <AsyncSelect
          ref={selectRef}
          defaultValue={defaultValue}
          classNamePrefix="react-select"
          noOptionsMessage={() => 'Nenhuma opção encontrada'}
          className={(error ? 'has-error ' : '') + className}
          {...rest}
        />
      )}
      {!async && (
        <ReactSelect
          ref={selectRef}
          defaultValue={defaultValue}
          classNamePrefix="react-select"
          noOptionsMessage={() => 'Nenhuma opção encontrada'}
          className={(error ? 'has-error ' : '') + className}
          {...rest}
        />
      )}
      {error && <span className="error">{error}</span>}
    </>
  );
};
export default Select;

import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputContainer, InputField, ErrorMessage } from './styles';

export default function Input({ name, ...ref }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer>
      <InputField
        ref={inputRef}
        defaultValue={defaultValue}
        error={error}
        {...ref}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

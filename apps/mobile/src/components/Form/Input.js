import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputField } from './styles';

export default function Input({ name, ...ref }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <InputField ref={inputRef} defaultValue={defaultValue} {...ref} />;
}

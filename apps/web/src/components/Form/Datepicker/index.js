import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR'; // the locale you want

registerLocale('pt-BR', ptBR);

const DatePicker = ({ name, className, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: ref => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        className={(error ? 'has-error ' : '') + className}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
};

export default DatePicker;

import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as Device from 'expo-device';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useField } from '@unform/core';

import {
  InputContainer,
  InputField,
  InputReadonly,
  InputText,
  Picker,
  ModalPicker,
  ModalPickerOverlay,
  ModalPickerContent,
  ErrorMessage,
  ModalPickerBar,
  ModalPickerButton,
} from './styles';

function DatePicker({ name, placeholder, onSubmitEditing, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [readonly, setReadonly] = useState(null);
  const [lastDate, setLastDate] = useState(null);

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

  function setValue(value) {
    setDate(value);
    inputRef.current._lastNativeText = value;
    setReadonly(format(value, 'dd/LL/yyyy'));
  }

  function onLoadInput() {
    if (defaultValue) {
      setValue(new Date(defaultValue));
    }
    inputRef.current.focus = () => setShow(true);
  }

  function onChangeHandler({ type }, changedDate) {
    if (Device.osName !== 'iOS') {
      setShow(false);
      if (type === 'set' && onSubmitEditing) {
        onSubmitEditing();
      }
    }
    if (changedDate) {
      setValue(changedDate);
    }
  }

  useEffect(() => {
    if (show) {
      setLastDate(date);
    }
    if (!show && lastDate && Device.osName === 'iOS') {
      onSubmitEditing();
    }
  }, [show]);

  const DTPicker = () => (
    <Picker
      value={date}
      is24Hour
      onChange={onChangeHandler}
      locale="pt-BR"
      {...rest}
    />
  );

  return (
    <>
      <InputContainer>
        <TouchableOpacity onPress={() => setShow(true)} activeOpacity={1}>
          <View pointerEvents="none">
            <InputField
              ref={inputRef}
              defaultValue={defaultValue}
              error={error}
              style={{ opacity: 0 }}
              onLayout={onLoadInput}
            />
            <InputReadonly
              style={{ position: 'absolute', width: '100%' }}
              error={error}
            >
              <InputText>{readonly || placeholder}</InputText>
            </InputReadonly>
          </View>
        </TouchableOpacity>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
      {Device.osName === 'iOS' ? (
        <ModalPicker visible={show}>
          <ModalPickerOverlay onPress={() => setShow(false)} />
          <ModalPickerContent>
            <ModalPickerBar>
              <ModalPickerButton
                onPress={() => setShow(false)}
                title="Pronto"
              />
            </ModalPickerBar>
            <DTPicker />
          </ModalPickerContent>
        </ModalPicker>
      ) : (
        show && <DTPicker />
      )}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSubmitEditing: PropTypes.func,
};
DatePicker.defaultProps = {
  placeholder: null,
  onSubmitEditing: false,
};

export default DatePicker;

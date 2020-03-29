import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import RNPickerSelect from 'react-native-picker-select';
import { InputContainer, ErrorMessage } from './styles';

const styles = StyleSheet.create({
  placeholder: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  viewContainer: {
    margin: 0,
    color: '#FFF',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  inputIOS: {
    fontSize: 16,
    color: '#FFFFFF',
    height: 42,
  },
  inputAndroid: {
    fontSize: 16,
    color: '#FFFFFF',
    height: 42,
    marginLeft: -6,
    marginRight: -6,
  },
});

function Select({ name, placeholder, onSubmitEditing, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'inputRef._lastNativeText',
      getValue(ref) {
        return ref.inputRef._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.inputRef.setNativeProps({ text: value });
        ref.inputRef._lastNativeText = value;
      },
      clearValue(ref) {
        ref.inputRef.setNativeProps({ text: '' });
        ref.inputRef._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  function onLoadInput() {
    selectRef.current.focus = () => selectRef.current.togglePicker(true);
  }

  function onChanged(value) {
    selectRef.current.inputRef.setNativeProps({ text: value });
    selectRef.current.inputRef._lastNativeText = value;
  }

  return (
    <InputContainer>
      <RNPickerSelect
        ref={selectRef}
        value={defaultValue}
        error={error}
        doneText="Pronto"
        placeholder={{
          label: placeholder,
          key: 0,
          value: 0,
        }}
        onValueChange={onChanged}
        style={styles}
        textInputProps={{ onLayout: onLoadInput }}
        onClose={() => onSubmitEditing && setTimeout(onSubmitEditing, 25)}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSubmitEditing: PropTypes.func,
};

Select.defaultProps = {
  placeholder: 'Selecione um item...',
  onSubmitEditing: false,
};

export default Select;

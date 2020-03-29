import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  View,
  Picker,
  StyleSheet,
} from 'react-native';
import * as Device from 'expo-device';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import {
  InputContainer,
  InputField,
  InputReadonly,
  InputText,
  ModalPicker,
  ModalPickerOverlay,
  ModalPickerContent,
  ErrorMessage,
  ModalPickerBar,
  ModalPickerButton,
} from './styles';

const styles = StyleSheet.create({
  inputField: { opacity: 0 },
  androidPicker: { color: '#FFF', margin: 0 - 6 },
  inputReadonly: { position: 'absolute', width: '100%' },
});

function Select({ name, items, placeholder, onSubmitEditing, ...rest }) {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const [pickerValue, setPickerValue] = useState(null);
  const [listItems, setListItems] = useState(items);
  const [show, setShow] = useState(false);
  const [readonly, setReadonly] = useState(null);

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

  useEffect(() => {
    if (placeholder) {
      setListItems([placeholder, ...items]);
    }
  }, []);

  function setValue(value) {
    setPickerValue(value);
    inputRef.current._lastNativeText = value;
    const [currentItem] = listItems.filter(obj => obj.value === value);
    setReadonly(currentItem.label);
  }

  function onLoadInput() {
    if (defaultValue) {
      setValue(defaultValue);
    }
    inputRef.current.focus = () => Device.osName === 'iOS' && setShow(true);
  }

  function onChangeHandler(value) {
    setValue(value);
    setShow(false);
    if (onSubmitEditing) {
      setTimeout(onSubmitEditing, 100);
    }
  }

  const SelectPicker = () => (
    <Picker
      ref={pickerRef}
      {...rest}
      selectedValue={pickerValue}
      onValueChange={onChangeHandler}
      style={Device.osName !== 'iOS' && styles.androidPicker}
    >
      {listItems.map((option, key) => (
        <Picker.Item label={option.label} value={option.value} key={key} />
      ))}
    </Picker>
  );

  useEffect(() => {
    if (show) {
      Keyboard.dismiss();
    }
  }, [show]);

  return (
    <>
      <InputContainer>
        <TouchableOpacity onPress={() => setShow(true)} activeOpacity={1}>
          <View pointerEvents={Device.osName === 'iOS' ? 'none' : 'auto'}>
            <InputField
              ref={inputRef}
              defaultValue={defaultValue.toString()}
              error={error}
              style={styles.inputField}
              onLayout={onLoadInput}
            />
            <InputReadonly style={styles.inputReadonly} error={error}>
              {Device.osName === 'iOS' ? (
                <InputText>{readonly || placeholder.label}</InputText>
              ) : (
                <SelectPicker />
              )}
            </InputReadonly>
          </View>
        </TouchableOpacity>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
      {Device.osName === 'iOS' && (
        <ModalPicker visible={show}>
          <ModalPickerOverlay onPress={() => setShow(false)} />
          <ModalPickerContent>
            <ModalPickerBar>
              <ModalPickerButton
                onPress={() => setShow(false)}
                title="Pronto"
              />
            </ModalPickerBar>
            <SelectPicker />
          </ModalPickerContent>
        </ModalPicker>
      )}
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onSubmitEditing: PropTypes.func,
};
Select.defaultProps = {
  placeholder: {},
  items: [],
  onSubmitEditing: false,
};

export default Select;

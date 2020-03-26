import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import colors from 'metrics/colors';
import { darken } from 'polished';

export const Form = styled(Unform)`
  input[type='text'],
  input[type='email'],
  input[type='password'] {
    padding: 10px 20px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    background: ${colors.christalle};
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 15px;
    width: 100%;
    &.has-error {
      margin-bottom: 2px;
    }

    + .error {
      margin-bottom: 5px;
    }

    ::placeholder {
      color: rgba(255, 255, 255, 9);
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-select__control {
    padding: 0px 10px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    background: ${colors.christalle};
    color: rgba(255, 255, 255, 1);
    height: 40px;
    &.has-error {
      margin-bottom: 2px;
    }

    &.react-select__control--is-focused {
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 0 1px transparent;
    }
  }
  .react-select__placeholder {
    color: rgba(255, 255, 255, 1);
  }
  .react-select__single-value {
    color: rgba(255, 255, 255, 1);
  }
  .react-select__menu {
    background: ${darken(0.03, colors.christalle)};
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    .react-select__option {
      cursor: pointer;
      &:hover {
        background: ${darken(0.1, colors.christalle)};
      }
    }
  }

  .react-select__option--is-disabled {
    background: ${darken(1, colors.christalle)};
  }
  .react-select__option--is-focused {
    background: ${darken(0.1, colors.christalle)};
  }
  .react-select__option--is-selected {
    background: ${darken(0.1, colors.christalle)};
  }
  .react-select__value-container {
    height: 40px;
  }
  .react-select-container {
    background: ${colors.christalle};
    color: rgba(255, 255, 255, 1);
  }
`;

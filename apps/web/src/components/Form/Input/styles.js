import styled from 'styled-components';
import colors from 'metrics/colors';

export const Container = styled.div`
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

    ::placeholder {
      color: rgba(255, 255, 255, 9);
    }
  }
`;

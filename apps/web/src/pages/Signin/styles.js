import styled from 'styled-components';

import colors from 'metrics/colors';

export const Container = styled.main`
  height: 100%;
`;

export const FormSection = styled.main`
  background: ${colors.white_smoke};
  min-height: 90vh;
  color: #fff;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export const FormContainer = styled.main`
  height: 100%;
  padding: 30px;
  border-radius: 20px;
  color: ${colors.white};
  background: ${colors.christalle};
  text-align: center;
`;

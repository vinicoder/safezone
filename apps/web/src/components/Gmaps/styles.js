import styled from 'styled-components';

import colors from 'metrics/colors';

export const ClusterMarker = styled.div`
  color: #fff;
  background: ${colors.christalle};
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CompanyMarker = styled.button`
  background: none;
  border: none;

  img {
    width: 25px;
  }
`;

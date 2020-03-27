import styled from 'styled-components';
import colors from 'metrics/colors';

export const Container = styled.div``;

export const AboutSection = styled.section`
  background: rgba(161, 148, 214, 8%);
  padding-top: 100px;
  padding-bottom: 100px;
  min-height: 90vh;

  img {
    width: 460px;
  }

  h3 {
    text-align: justify;
    color: rgb(238, 66, 102);
    font-family: 'Poppins';
    font-size: 55.8px;
    font-weight: bolder;
  }

  .sub-title {
    text-align: justify;
    color: ${colors.christalle};
    font-family: 'Open sans';
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .description {
    text-align: justify;
    color: ${colors.christalle};
    font-family: 'Open sans';
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

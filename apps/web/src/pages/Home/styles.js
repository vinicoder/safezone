import styled from 'styled-components';
import { darken } from 'polished';
import colors from 'metrics/colors';

const colorsText = {
  primary: 'rgb(250, 250, 250)',
  secondary: 'rgb(42, 30, 92)',
};

export const Container = styled.main`
  width: 100%;
`;

export const HeroSection = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;

  h1 {
    font-family: 'Poppins';
    font-size: 55px;
    font-weight: bolder;
    line-height: 60px;
    color: ${colorsText.secondary};
    margin-bottom: 30px;
  }

  p {
    font-family: 'Open sans';
    color: ${colorsText.secondary};
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 30px;
  }

  img {
    width: 420px;
  }
`;

export const MapSection = styled.section`
  display: flex;
  height: 90vh;
  background: rgba(224, 222, 231, 12%);

  .companies {
    width: 40%;
    font-family: 'Poppins';
    padding: 30px 70px;

    overflow-y: auto;
    .header-list {
      color: rgb(238, 66, 102);
      strong {
        color: ${colorsText.secondary};
        font-size: 64px;
      }
    }
  }
  .map {
    width: 60%;
  }

  .cluster-marker {
    color: #fff;
    background: ${colors.christalle};
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .company-marker {
    background: none;
    border: none;
  }

  .company-marker img {
    width: 25px;
  }
`;

export const CompanyList = styled.div`
  margin: 4px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CompanyBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  padding: 20px 20px;
  min-height: 150px;
  margin: 9px 0px;

  .title {
    width: 100%;
    margin-bottom: 10px;

    font-size: 24px;
    font-weight: bold;
  }

  .tag-list {
    width: 100%;
    min-height: 30px;
    ul {
      list-style-type: none;
    }
  }

  .updated-info {
    width: 100%;
    color: rgb(160, 163, 165);
    font-size: 12px;
    font-style: italic;
  }
`;

export const Tag = styled.li`
  float: left;
  display: block;
  background: rgb(238, 66, 102);
  border-radius: 24px;
  color: #fff;
  font-weight: 600;
  padding: 2px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const AboutSection = styled.section`
  background: rgba(161, 148, 214, 8%);
  padding-top: 100px;
  padding-bottom: 100px;

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
    color: ${colorsText.secondary};
    font-family: 'Open sans';
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .description {
    text-align: justify;
    color: ${colorsText.secondary};
    font-family: 'Open sans';
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

export const FormSection = styled.section`
  background: ${colorsText.secondary};
  color: #fff;
  padding-top: 100px;
  padding-bottom: 100px;

  h4 {
    font-family: 'Poppins';
    font-size: 55.8px;
    font-weight: bolder;
  }

  img {
    width: 390px;
  }

  form {
    .form-title {
      font-family: 'Open sans';
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 30px;
    }

    .title-situations {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }

    p.remember {
      font-size: 14px;
      font-weight: bold;
      margin-top: 10px;
    }

    p.terms {
      font-size: 14px;
      margin-top: 10px;
    }
  }
`;

export const SearchInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #fff;
  padding: 5px 5px;
  border-radius: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type='search'] {
    border: none;
    height: 30px;
    width: 85%;
    margin: 0;
    margin-left: 10px;
    padding: 7px;
    -webkit-appearance: textfield;
    outline-offset: -2px;

    font-family: 'Poppins';
    font-size: 20px;
    font-weight: lighter;

    &::placeholder {
      color: rgba(42, 30, 92);
    }
  }

  .icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 15%;

    svg {
      cursor: pointer;
      border-radius: 50%;
      background-color: rgb(238, 66, 102);
      height: 33px;
      width: 33px;
      transition: background 300ms;

      margin: 0;
      padding: 10px 10px;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;

      &:hover {
        background-color: ${darken(0.2, 'rgb(238, 66, 102)')};
        fill: white;
      }
    }
  }
`;

export const SearchMessage = styled.div`
  padding: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
`;

export const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5px;
`;

export const SearchResult = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-top-width: 1px;
  border-top-color: rgba(155, 155, 155, 0.1);
  padding: 10px 5px;
  border-radius: 10px;
  transition: background-color 300ms;

  &:hover {
    background: rgba(155, 155, 155, 0.1);
    cursor: pointer;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const SearchInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SearchResultName = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.christalle};
`;

export const SearchResultDesc = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.5);
`;

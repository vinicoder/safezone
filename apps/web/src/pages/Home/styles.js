import styled from 'styled-components';

const colorsButton = {
  primary: 'rgb(42, 30, 92)',
  secondary: 'rgb(249, 249, 249)',
};

const colorsText = {
  primary: 'rgb(250, 250, 250)',
  secondary: 'rgb(42, 30, 92)',
};

export const Container = styled.main``;

export const Header = styled.header`
  padding: 25px 0px;
  width: 100%;
  height: 100px;
  overflow-x: hidden;
  img {
    pointer-events: none;
    width: 248px;
  }

  nav {
    display: flex;
    list-style: none;
    align-items: center;
    margin-right: -15px;
    li {
      margin: 0 15px;
    }
  }

  @media screen and (max-width: 800px) {
    padding: 20px 50px;
    flex-direction: column;

    h2 {
      margin-bottom: 15px;
    }

    nav {
      margin-right: 0;
    }
  }
`;

export const ShapedLink = styled.button`
  padding: 5px 35px;
  height: 40px;
  border-radius: 20px;
  border: none;

  font-weight: ${props => (props.strong ? 'bold' : 'normal')};
  background: ${props =>
    props.primary ? colorsButton.primary : colorsButton.secondary};
  color: ${props =>
    props.primary ? colorsText.primary : colorsText.secondary};
  font-size: 16px;
`;

export const UserProfileButton = styled.button`
  background: rgba(42, 30, 92, 60%);
  border-radius: 50%;
  border: none;
  color: #fff;
  font-size: 30px;
  width: 40px;
  height: 40px;
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
  .right-column {
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

    input[type='text'],
    input[type='email'],
    input[type='password'] {
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 15px;
      background: ${colorsButton.primary};
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 20px;

      ::placeholder {
        color: rgba(255, 255, 255, 9);
      }
    }

    input[type='checkbox'] {
      label {
        font-size: 18px;
        font-weight: normal !important;
        color: rgba(255, 255, 255, 1);
      }
    }

    select {
      min-width: 130px;
      min-height: 42px;
      height: 42px;
      line-height: 42px;
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 15px;
      background: ${colorsButton.primary};
      font-size: 18px;
      color: rgba(255, 255, 255, 1);

      ::placeholder {
        color: rgba(255, 255, 255, 9);
      }
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

export const Footer = styled.footer`
  height: 64px;
  .container,
  .row {
    height: 100%;
  }
  strong {
    color: rgb(238, 66, 102);
  }
`;

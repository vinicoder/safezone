import styled from 'styled-components';

const colorsButton = {
  primary: 'rgb(42, 30, 92)',
  secondary: 'rgb(249, 249, 249)',
};

const colorsText = {
  primary: 'rgb(250, 250, 250)',
  secondary: 'rgb(42, 30, 92)',
};

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  nav {
    list-style: none;
  }

  .flex-container {
    display: flex;

    width: 100%;
    padding: 25px 200px 0;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 500px;

    .box-description-hero {
      width: 440px;

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
    }

    img {
      width: 420px;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 25px 200px 0;
  overflow-x: hidden;

  nav {
    display: flex;
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
  padding: 10px 5px;
  background: rgba(42, 30, 92, 60%);
  border-radius: 50%;
  border: none;
`;

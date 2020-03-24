import styled from 'styled-components';

export const Container = styled.header`
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

export const UserProfileButton = styled.button`
  background: rgba(42, 30, 92, 60%);
  border-radius: 50%;
  border: none;
  color: #fff;
  font-size: 30px;
  width: 40px;
  height: 40px;
`;

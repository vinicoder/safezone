import styled from 'styled-components';
import colors from 'metrics/colors';

export const Container = styled.div``;

export const PlaceSection = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;
  background: rgb(161, 148, 214, 8%);

  h4 {
    font-family: 'Open sans';
    font-size: 1.5em;
    font-weight: normal;
    margin-bottom: 5%;
  }

  .tag-list {
    width: 100%;
    min-height: 30px;
    margin-bottom: 10px;
    ul {
      list-style-type: none;
    }
  }

  .form-container {
    width: 100%;

    img {
      min-height: 200px;
      width: 350px;
      padding: 0;
      margin-left: 110px;
    }

    form {
      margin-top: -51px;
      background: ${colors.christalle};
      border-radius: 30px;
      padding: 30px;
      color: #fff;
      font-family: 'Open sans';

      h3 {
        font-family: 'Open sans';
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 5%;
      }

      .situations {
        display: inline;
      }

      label.input-checked {
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 1em;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        user-select: none;

        display: inline-block;

        padding: 2px 20px;
        margin-right: 5px;
        margin-bottom: 5px;
        background: rgb(238, 66, 102);
        border-radius: 24px;
      }

      .title-situations {
        font-weight: bold;
        font-size: 1em;
        margin-bottom: 10px;
      }

      .message {
        margin-top: 15px;
        margin-bottom: 15px;
      }
    }
  }
`;

export const Title = styled.div`
  font-family: 'Poppins';
  font-size: 4em;
  font-weight: bolder;
  line-height: 60px;
  color: ${colors.christalle};
  /* margin-bottom: 30px; */
`;

export const Count = styled.div`
  font-family: 'Poppins';
  font-size: 1.5em;
  font-weight: 300;
  color: ${colors.christalle};
  margin-bottom: 10px;
  margin-top: 10px;
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

export const DenunciationContainer = styled.div`
  text-align: center;
  color: ${colors.christalle};

  h1 {
    font-family: 'Poppins';
    font-size: 30px;
    font-weight: 600;
  }

  .subtitle {
    font-family: 'Poppins';
    font-size: 17px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 30px;
  }

  p {
    font-family: 'Poppins';
    font-size: 16px;
    font-weight: 300;
    text-align: initial;
    margin-bottom: 10px;
  }
`;

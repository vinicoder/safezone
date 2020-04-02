import { createGlobalStyle } from 'styled-components';
import 'bootstrap/scss/bootstrap-grid.scss';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

  .switch-wrapper {
    position: relative;
    width: 100%;
  }

  .switch-wrapper > div {
    position: absolute;
    width: 100%;
  }

  .Toastify__toast-container {
    font-family: 'Open Sans';
    .Toastify__toast--error{
      background: #c0392b;
      border-radius: 6px;
    }
    .Toastify__toast--success{
      background: #27ae60;
      border-radius: 6px;
    }
    .Toastify__toast--warning{
      background: #f1c40f;
      border-radius: 6px;
    }
  }
`;

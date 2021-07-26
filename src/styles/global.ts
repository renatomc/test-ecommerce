import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    outline: 0;
    text-decoration: none;
    border: none;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #5f3473;
    --secondary-color: #936ba6;
    --with-color: #ffffff;
    --background-primary-color: #f3f3f3;
    --font-primary-color: #ffffff;
    --font-secondary-color: #cacaca;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: var(--secondary-color);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 1.4rem Roboto, sans-serif;
  }

  #root {
    /* max-width: 1020px; */
    margin: 0 auto;
    /* padding: 0 20px 50px; */
  }

  button {
    cursor: pointer;
  }
`;

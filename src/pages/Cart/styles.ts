import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  background: var(--background-primary-color);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2rem 4rem;

  footer {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: var(--primary-color);
      color: #fff;
      border: 0;
      border-radius: 0.4rem;
      padding: 1.2rem 2rem;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#5f3473')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 1.2rem;
  }

  tbody td {
    padding: 1.2rem;
    border-bottom: 0.1rem solid #eee;

    @media only screen and (max-width: 620px) {
      padding: unset;

      &:nth-child(2) {
        padding: 1rem;
      }
    }
  }

  img {
    height: 12rem;
    width: 12rem;

    @media only screen and (max-width: 620px) {
      height: 8rem;
      width: 8rem;
    }
  }

  strong {
    color: #333;
    display: block;

    @media only screen and (max-width: 620px) {
      font-size: 1rem;
    }
  }

  span {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.8rem;
    font-weight: bold;

    @media only screen and (max-width: 620px) {
      font-size: 1.4rem;
    }
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 0.1rem solid #ddd;
      border-radius: 0.4rem;
      color: #666;
      padding: 0.6rem;
      width: 5rem;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: var(--primary-color);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#5f3473')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#5f3473')};
        cursor: not-allowed;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;

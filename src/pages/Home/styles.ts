import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  background: var(--background-primary-color);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2rem 4rem;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  list-style: none;

  @media only screen and (max-width: 1000px) {
    padding: 0 8rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 760px) {
    grid-template-columns: repeat(1, 1fr);
  }

  li {
    display: flex;
    flex-direction: column;
    background: var(--with-color);
    border-radius: 0.4rem;
    padding: 2rem;

    img {
      align-self: center;
      width: 12rem;
    }

    > strong {
      font-size: 1.6rem;
      line-height: 2rem;
      color: #333;
      margin-top: 0.5rem;
    }

    > span {
      font-size: 2.1rem;
      font-weight: bold;
      margin: 0.5rem 0 2rem;
    }

    button {
      background: var(--primary-color);
      color: #fff;
      border: 0;
      border-radius: 0.4rem;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      @media only screen and (max-width: 780px) {
        padding-right: 1rem;
      }

      &:hover {
        background: ${darken(0.06, '#936ba6')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 1.2rem;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 0.5rem;
        }
      }

      span {
        flex: 1;
        font-size: 1.4rem;
        text-align: center;
        font-weight: bold;

        @media only screen and (max-width: 1000px) {
          font-size: 1rem;
        }
      }
    }
  }
`;

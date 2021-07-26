import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary-color);
  padding: 2rem 4rem;
  max-width: 1020px;
`;

export const LinkLogo = styled(Link)`
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

export const ImgLogo = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const CartWrapper = styled.div`
  text-align: right;
  margin-right: 1rem;
`;

export const CartText = styled.strong`
  display: block;
  color: var(--font-primary-color);

  + strong {
    margin-top: 0.8rem;
  }
`;

export const CartItens = styled.span`
  font-size: 1.2rem;
  color: var(--font-secondary-color);
`;

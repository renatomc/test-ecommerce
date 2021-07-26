import React, { useMemo } from 'react';
import { MdShoppingBasket } from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

import logo from '../../assets/logo.jpeg';

import {
  Container,
  Cart,
  ImgLogo,
  LinkLogo,
  CartWrapper,
  CartText,
  CartItens,
} from './styles';
import Login from '../Login';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  const cartSize = useMemo(() => cart.length, [cart]);

  return (
    <Container>
      <LinkLogo to="/">
        <ImgLogo src={logo} alt="Framework Digital" />
      </LinkLogo>

      {!user && <Login />}

      {user && (
        <Cart to="/cart">
          <CartWrapper>
            <CartText>Bem vindo, {user.name}</CartText>
            <CartText>Meu carrinho</CartText>
            <CartItens data-testid="cart-size">
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
            </CartItens>
          </CartWrapper>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      )}
    </Container>
  );
};

export default Header;

import React, { useState, useEffect, useMemo } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/format';
import { api } from '../../services/api';
import SearchProducts from '../../components/SearchProducts';

import { Container, ProductList } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home: React.FC = () => {
  const { addProduct, cart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      setProducts(response.data);
    }
    if (!searchTerm) loadProducts();
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) return;
    async function loadProducts() {
      const params = {
        title_like: searchTerm,
      };
      const response = await api.get('/products', { params });
      setProducts(response.data);
    }
    loadProducts();
  }, [searchTerm]);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  const cartItemsAmount = useMemo(() => {
    const carItems = cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {} as CartItemsAmount);
    return carItems;
  }, [cart]);

  return (
    <Container>
      <SearchProducts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{formatPrice(product.price)}</span>
            {user && (
              <button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            )}
            {!user && (
              <button type="button">
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                </div>
                <span>Efetuar login para comprar</span>
              </button>
            )}
          </li>
        ))}
      </ProductList>
    </Container>
  );
};

export default Home;

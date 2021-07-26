import React, { useMemo } from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/format';
import { Impressao } from '../../utils/impressao';

import { Container, ProductTable, Total } from './styles';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart: React.FC = () => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const { user } = useAuth();

  const cartFormatted = useMemo(() => {
    return cart.map(product => ({
      ...product,
      priceFormated: formatPrice(product.price),
      priceTotal: formatPrice(product.amount * product.price),
    }));
  }, [cart]);

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  const total = useMemo(() => {
    return formatPrice(
      cart.reduce((sumTotal, product) => {
        sumTotal += product.amount * product.price;
        return sumTotal;
      }, 0),
    );
  }, [cart]);

  async function generatePDF() {
    const classeImpressao = new Impressao(cartFormatted, total, user.name);
    const document = await classeImpressao.prepareDocument();
    pdfMake.createPdf(document).open({}, window.open('', '_blank'));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(product => (
            <tr data-testid="product" key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.priceTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button" onClick={generatePDF}>
          Finalizar pedido
        </button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;

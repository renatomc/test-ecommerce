import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../dtos/types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@FrameworkApp:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const copyCart = [...cart];
      const productAlter = copyCart.find(product => product.id === productId);

      const response = await api.get(`/stock/${productId}`);
      const stock = response.data.amount;

      const oldAmount = productAlter ? productAlter.amount : 0;
      const amount = oldAmount + 1;

      if (stock < amount) {
        toast.error(
          `A quantidade que você selecionou está acima da quantidade em estoque ${stock}.`,
        );
        return;
      }

      if (productAlter) {
        productAlter.amount = amount;
        setCart(copyCart);
        localStorage.setItem('@FrameworkApp:cart', JSON.stringify(copyCart));
      } else {
        const responseProduct = await api.get(`/products/${productId}`);
        const product = responseProduct.data;
        const newPŕoduct = {
          ...product,
          amount,
        };

        setCart([...cart, newPŕoduct]);
        localStorage.setItem(
          '@FrameworkApp:cart',
          JSON.stringify([...cart, newPŕoduct]),
        );
      }
    } catch {
      toast.error('Erro ao adicionar o produto, tente novamente!');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const indexCart = cart.findIndex(product => product.id === productId);

      if (indexCart === -1)
        throw new Error(
          'Este produto não se encontra no carrinho, verifique novamente!',
        );

      const newCart = cart.filter(product => product.id !== productId);

      setCart([...newCart]);

      localStorage.setItem('@FrameworkApp:cart', JSON.stringify(newCart));
    } catch (e) {
      toast.error('Erro ao remover o produto.');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) return;
      const indexCart = cart.findIndex(product => product.id === productId);

      if (indexCart === -1)
        throw new Error(
          'Este produto não se encontra no carrinho, verifique novamente!',
        );

      const response = await api.get(`/stock/${productId}`);

      const { amount: stock } = response.data;
      const newCart = cart;

      if (stock >= amount) {
        newCart[indexCart].amount = amount;

        setCart([...newCart]);

        localStorage.setItem('@FrameworkApp:cart', JSON.stringify(newCart));
      } else {
        toast.error(
          `A quantidade selecionada está acima do valor que contém em estoque ${stock}.`,
        );
      }
    } catch (e) {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

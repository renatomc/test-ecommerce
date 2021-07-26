import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <Routes />
          <Footer />
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

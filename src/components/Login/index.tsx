import React, { useState, useCallback } from 'react';

import { useAuth } from '../../hooks/useAuth';

import { Container } from './styles';

const Login: React.FC = () => {
  const { signIn } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShowLogin = useCallback(() => {
    setShowLogin(true);
  }, []);

  const handleLoginSubmit = useCallback(
    e => {
      e.preventDefault();
      signIn({ email, password });
    },
    [email, password, signIn],
  );

  return (
    <Container onSubmit={handleLoginSubmit}>
      {showLogin && (
        <form>
          <label htmlFor="email">
            E-mail
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
              type="text"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </label>
          <button type="submit">Logar</button>
        </form>
      )}
      {!showLogin && (
        <button onClick={handleShowLogin} type="button">
          Efetuar Login
        </button>
      )}
    </Container>
  );
};

export default Login;

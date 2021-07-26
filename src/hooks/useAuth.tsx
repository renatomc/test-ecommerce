import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useContext,
} from 'react';
import { api } from '../services/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInData {
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [data, setData] = useState<SignInData>(() => {
    const user = localStorage.getItem('@FrameworkApp:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as SignInData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const params = {
      email,
      password,
    };
    const response = await api.get('users', {
      params,
    });

    const userResponse = response.data;
    delete userResponse[0].password;

    localStorage.setItem('@FrameworkApp:user', JSON.stringify(userResponse[0]));

    setData({ user: userResponse[0] });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FrameworkApp:user');

    setData({} as SignInData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

import API from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";

type User = {
  firstName: string;
  lastName?: string;
  email?: string;
  telegramId?: string;
  avatar: string;
  coin: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
} | null;

const AuthContext = createContext<{
  user: User;
  refresh: () => void;
  logout: () => void;
}>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const refresh = () => {
    API.get('/user/me').then((res) => {
      setUser(res.data);
    }).catch(() => {
      setUser(null);
    });
  }

  const logout = () => {
    API.post('/auth/logout').then((_res) => {
      googleLogout();
      refresh();
    }).catch(console.error);
  }

  useEffect(refresh, []);

  return (
    <AuthContext.Provider value={{ user, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
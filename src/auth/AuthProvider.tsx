import jwtDecode from "jwt-decode";
import { createContext } from "react";
import User from "../entities/User";
import useUser from "../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

interface Auth {
  _id: string;
}

interface AuthContextType {
  user: User;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  if (!token) return <> {children} </>;
  const { _id } = jwtDecode<Auth>(token);
  const { data: user } = useUser(_id);
  if (!user) return <>{children}</>;
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

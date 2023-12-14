"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import axios from "axios";

type User = {
  name: string;
  email: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: ({ email, password }: SignInData) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const Router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function recoverUserInformation() {
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.get("http://localhost:3333/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { email, name } = response.data;

    return { user: { email, name } };
  }

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await axios.post("http://localhost:3333/sessions", {
        email,
        password,
      });

      const { token, user } = await response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      // Set Authorization header for all subsequent requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);

      Router.push("/perfil");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

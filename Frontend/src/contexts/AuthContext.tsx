"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import axios from "axios";

type User = {
  email: string;
  name: string;
  password?: string;
  date: string;
  gender: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: ({ email, password }: SignInData) => Promise<void>;
  recoverUserInformation: () => Promise<void | { user: User }>; // Update return type
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: (user: User) => Promise<void | JSON>;
  isLoading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const Router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  const isAuthenticated = !!user;

  async function recoverUserInformation(): Promise<{ user: User }> {
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.get("http://localhost:3333/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { email, name, date, gender } = response.data;

    return { user: { email, name, date, gender } };
  }

  async function registerUser({ email, password, name, date, gender }: User) {
    setIsLoading(true);
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.post(
      "http://localhost:3333/users",
      {
        email,
        password,
        name,
        date,
        gender,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { message } = await response.data;
    setIsLoading(false);
    return message;
  }

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
      alert("Login ou senha incorretos");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        recoverUserInformation,
        setUser,
        registerUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import axios from "axios";

type User = {
  email: string;
  name: string;
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
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const Router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

  async function updateUserInformation({
    email,
    name,
    date,
    gender,
  }): Promise<{ user: User }> {
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.put(
      "http://localhost:3333/users/profile/update",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          name,
          date,
          gender,
        }),
      }
    );

    // const { email, name, date, gender } = response.data;

    // return { user: { email, name, date, gender } };
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
      console.error("Login error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, recoverUserInformation, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

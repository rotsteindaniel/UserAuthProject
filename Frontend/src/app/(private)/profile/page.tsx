"use client";

import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function Profile() {
  const Router = useRouter();

  const { user, setUser, isAuthenticated, recoverUserInformation } =
    useContext<AuthContextType>(AuthContext);

  async function fetchUserData() {
    const userData = await recoverUserInformation();
    setUser(userData?.user || null);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
      alert("You are not logged in.");
    } else {
      fetchUserData();
    }
  }, [isAuthenticated]);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p>Olá {user?.name}</p>
        <p>Seu email é {user?.email}</p>
      </div>
    </main>
  );
}

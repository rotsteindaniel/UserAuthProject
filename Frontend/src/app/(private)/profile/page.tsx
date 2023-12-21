"use client";

import { useContext, useEffect } from "react";
import styles from "./page.module.css";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const Router = useRouter();

  const { user, setUser, isAuthenticated, recoverUserInformation } =
    useContext<AuthContextType>(AuthContext);

  async function fetchUserData() {
    const userData = await recoverUserInformation();
    setUser(userData?.user || null);
  }

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!isAuthenticated) {
      // Se não estiver autenticado, redirecione para a página de login
      Router.push("/login");
      alert("Você não está logado");
    } else {
      // Recupera as informações do usuário sempre que o componente for montado
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

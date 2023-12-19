"use client";

import { useContext, useEffect } from "react";
import styles from "./page.module.css";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const Router = useRouter();

  const { user, setUser, isAuthenticated, recoverUserInformation } =
    useContext<AuthContextType>(AuthContext);

  async function newRecoverUserInformation() {
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
      newRecoverUserInformation();
    }
  }, [isAuthenticated]);

  // Se o usuário não estiver autenticado, evite a renderização do conteúdo da página
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p>Olá {user?.name}</p>
        <p>Seu email é {user?.email}</p>
      </div>
    </main>
  );
}

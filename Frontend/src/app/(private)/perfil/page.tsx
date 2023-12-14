"use client";

import { useContext } from "react";
import styles from "./page.module.css";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const Router = useRouter();

  const { user } = useContext<AuthContextType>(AuthContext);

  return (
    <main className={styles.main}>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </main>
  );
}

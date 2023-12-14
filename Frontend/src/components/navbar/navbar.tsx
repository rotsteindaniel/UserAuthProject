"use client";

import Link from "next/link";

import styles from "./navbar.module.css";
import Button from "../forms/button/button";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Button>
            {" "}
            <Link href="/">Página Inicial</Link>
          </Button>
        </li>
        <li className={styles.li}>
          <Button>
            <Link href="/lista">Lista de Usuários</Link>
          </Button>
        </li>
        {isAuthenticated ? (
          <>
            <li className={styles.li}>
              <Button>
                <Link href="/edicao">Editar Usuário</Link>
              </Button>
            </li>
            <li className={styles.li}>
              <Button>
                <Link href="/lista">Lista de Usuários</Link>
              </Button>
            </li>
            <li className={styles.li}>
              <Button>Logout</Button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.li}>
              <Button>
                {" "}
                <Link href="/login">Login</Link>
              </Button>
            </li>
            <li className={styles.li}>
              <Button>
                <Link href="/register">Cadastro</Link>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

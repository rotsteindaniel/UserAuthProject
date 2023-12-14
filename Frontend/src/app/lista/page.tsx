"use client";

import React from "react";
import styles from "./page.module.css";
import { useUserListing } from "@/hooks/useUserListing";

export default function Lista() {
  const { isLoading, error, users } = useUserListing();

  return (
    <main className={styles.main}>
      <h1>Lista de Usuários</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {users && (
        <div className={styles.users}>
          {users.map((user) => (
            <div key={user.id} className={styles.card}>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              {/* Add other user details as needed */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

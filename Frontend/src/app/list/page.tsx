"use client";

import React from "react";
import styles from "./page.module.css";
import { useUserListing } from "@/hooks/useUserListing";

export default function List() {
  const { isLoading, error, users } = useUserListing();

  return (
    <main className={styles.main}>
      <h1>Users List</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!isLoading && !error && users && users.length === 0 && (
        <div>
          <br />
          <br />
          <br />
          <p>No registered users yet.</p>
        </div>
      )}

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

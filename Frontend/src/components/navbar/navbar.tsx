"use client";

import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useContext } from "react";

import Link from "next/link";
import Button from "../forms/button/button";

import styles from "./navbar.module.css";

export default function Navbar() {
  const { isAuthenticated, logOut, deleteUser } =
    useContext<AuthContextType>(AuthContext);

  async function handleDeleteUser() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await deleteUser();
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Button>
            {" "}
            <Link href="/">Home Page</Link>
          </Button>
        </li>
        <li className={styles.li}>
          <Button>
            <Link href="/list">List Users</Link>
          </Button>
        </li>
        {isAuthenticated ? (
          <>
            <li className={styles.li}>
              <Button>
                <Link href="/edit">Edit User</Link>
              </Button>
            </li>
            <li className={styles.li}>
              <Button>
                <Link href="/profile">User Profile</Link>
              </Button>
            </li>

            <li className={styles.li}>
              <Button onClick={handleDeleteUser}>Delete Account</Button>
            </li>

            <li className={styles.li}>
              <Button>
                <Link href="/" onClick={logOut}>
                  Log Out
                </Link>
              </Button>
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
                <Link href="/register">Sing Up</Link>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

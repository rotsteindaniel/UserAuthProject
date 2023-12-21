"use client";

import Link from "next/link";

import styles from "./navbar.module.css";
import Button from "../forms/button/button";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { isAuthenticated, logOut, deleteUser } =
    useContext<AuthContextType>(AuthContext);

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await deleteUser();
        // You can add additional logic after successful deletion if needed
      } catch (error) {
        console.error("Error deleting user", error);
        // Handle error or provide feedback to the user
      }
    }
  };

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

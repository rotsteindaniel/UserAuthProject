"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import Link from "next/link";

import LoginCard from "../../../components/cards/logincard/login";
import Input from "../../../components/forms/input/input";
import Button from "../../../components/forms/button/button";

import styles from "./page.module.css";

export type SignInData = {
  email: string;
  password: string;
};

const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "The email is mandatory." })
    .email({ message: "Mandatory field." }),
  password: z.string().min(1, { message: "The password is mandatory." }),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  async function handleSignIn({ email, password }: loginUserFormData) {
    try {
      await signIn({ email, password });
      router.replace("/profile");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Login">
        <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            register={register}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            register={register}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <Button>Login</Button>
          <Link href="/register" className={styles.register}>
            "Don't have an account?"
          </Link>
        </form>
      </LoginCard>
    </div>
  );
}

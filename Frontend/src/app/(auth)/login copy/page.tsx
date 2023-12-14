"use client";

import { useContext, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";

import styles from "./page.module.css";

import LoginCard from "../../../components/cards/logincard/login";
import Input from "../../../components/forms/input/input";
import Button from "../../../components/forms/button/button";
// import { AuthContext, SignInData } from "@/contexts/AuthContext";

const loginUserFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "Campo obrigatório" }),
  password: z.string().nonempty({ message: "A senha é obrigatória" }),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function LoginPageCopy() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  // const { signIn } = useContext(AuthContext);

  async function handleSignIn({ email, password }: SignInData) {
    await signIn({ email, password });
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Faça seu login">
        <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
          <Input
            type="e-mail"
            placeholder="Seu e-mail"
            name="email"
            register={register}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Sua senha"
            name="password"
            register={register}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <Button>Entrar</Button>
          <Link href="/cadastro" className={styles.cadastro}>
            Não possui uma conta?
          </Link>
        </form>
      </LoginCard>
    </div>
  );
}

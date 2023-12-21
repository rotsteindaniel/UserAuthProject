"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import Link from "next/link";

import LoginCard from "../../components/cards/logincard/login";
import Input from "../../components/forms/input/input";
import Button from "../../components/forms/button/button";

import styles from "./page.module.css";

const createUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "The email is mandatory." })
    .email({ message: "The email is mandatory." }),
  password: z
    .string()
    .min(1, { message: "The password is mandatory." })
    .min(6, { message: "Short password (less than 6 characters)." })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "The password must contain letters, numbers, and special characters.",
    }),
  name: z.string().min(1, { message: "The full name is mandatory." }),
  date: z.string().min(1, { message: "The date of birth is mandatory." }),
  gender: z.string().min(1, { message: "The gender is mandatory." }),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function Register() {
  const Router = useRouter();

  const { registerUser, isLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function onSubmit({
    email,
    password,
    name,
    date,
    gender,
  }: CreateUserFormData) {
    try {
      const message = await registerUser({
        email,
        password,
        name,
        date,
        gender,
      });

      // If the registration is successful, alert the user and navigate to the login page
      alert(message);
      Router.push("/login");
    } catch (error) {
      // If there's an error, handle it and alert the user
      console.error("An error occurred during registration", error);
      alert("Error registering user. Please try again.");
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Create your account">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            register={register}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            register={register}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <Input
            type="text"
            placeholder="First and last name"
            name="name"
            autoComplete="name"
            register={register}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          <Input
            type="date"
            placeholder="Date of birth"
            name="date"
            autoComplete="bday"
            register={register}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
          <select {...register("gender")} className={styles.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="not_specified">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <Link href="/login">Already have an account?</Link>
        </form>
      </LoginCard>
    </div>
  );
}

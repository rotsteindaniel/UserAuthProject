"use client";

import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginCard from "@/components/cards/logincard/login";
import Input from "@/components/forms/input/input";
import Button from "@/components/forms/button/button";

import styles from "./page.module.css";

const updateUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "The email is mandatory." })
    .email({ message: "Mandatory field." }),
  name: z.string().min(1, { message: "The full name is mandatory." }),
  date: z.string().min(1, { message: "The date of birth is mandatory." }),
  gender: z.string().min(1, { message: "The gender at birth is mandatory." }),
});

export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>;

export default function Edit() {
  const Router = useRouter();

  const {
    user,
    isAuthenticated,
    isLoading,
    updateUser,
    recoverUserInformation,
  } = useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserFormSchema),
  });

  async function onSubmit({ email, name, date, gender }: UpdateUserFormData) {
    try {
      const message = await updateUser({ email, name, date, gender });

      await recoverUserInformation();

      alert(message);
      Router.push("/profile");
    } catch (error) {
      alert("Error registering user. Please try again.");
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Edit your information">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Seu e-mail"
            name="email"
            autoComplete="email"
            register={register}
            defaultValue={user?.email}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Input
            type="text"
            placeholder="Your first and last name."
            name="name"
            autoComplete="name"
            register={register}
            defaultValue={user?.name}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          <Input
            type="date"
            placeholder="Date of birth."
            name="date"
            autoComplete="bday"
            register={register}
            defaultValue={user?.date}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
          <select
            {...register("gender")}
            className={styles.gender}
            defaultValue={user?.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="not_specified">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Editing..." : "Edit"}
          </Button>
        </form>
      </LoginCard>
    </div>
  );
}

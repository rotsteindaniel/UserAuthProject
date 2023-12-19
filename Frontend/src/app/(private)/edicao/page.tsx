"use client";

import { useContext, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginCard from "@/components/cards/logincard/login";
import Input from "@/components/forms/input/input";
import Button from "@/components/forms/button/button";

const updateUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O email é obrigatório" })
    .email({ message: "Campo obrigatório" }),
  name: z.string().min(1, { message: "A nome completo é obrigatório" }),
  date: z.string().min(1, { message: "A data de nascimento é obrigatória" }),
  gender: z
    .string()
    .min(1, { message: "A gênero de nascimento é obrigatória" }),
});

export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>;

export default function Edicao() {
  const Router = useRouter();

  const {
    user,
    isAuthenticated,
    isLoading,
    updateUser,
    recoverUserInformation,
  } = useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!isAuthenticated) {
      // Se não estiver autenticado, redirecione para a página de login
      Router.push("/login");
    }
  }, [isAuthenticated]);

  // Se o usuário não estiver autenticado, evite a renderização do conteúdo da página
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

      // Após a edição, recupera novamente as informações do usuário
      await recoverUserInformation();

      // If the registration is successful, alert the user and navigate to the login page
      alert(message);
      Router.push("/perfil");
    } catch (error) {
      // If there's an error, handle it and alert the user
      alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Edite seus dados">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="e-mail"
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
            placeholder="Seu nome e sobrenome"
            name="name"
            autoComplete="name"
            register={register}
            defaultValue={user?.name}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          <Input
            type="date"
            placeholder="Data de nascimento"
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
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Não informar">Não informar</option>
          </select>
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Editando..." : "Editar"}
          </Button>
        </form>
      </LoginCard>
    </div>
  );
}

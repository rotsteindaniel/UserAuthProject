// useUserRegistration.ts

import { CreateUserFormData } from "@/app/register/page";
import { useState } from "react";

interface UseUserRegistration {
  isLoading: boolean;
  error: string | null;
  registerUser: ({
    email,
    password,
    name,
    date,
    gender,
  }: CreateUserFormData) => Promise<void>;
}

const useUserRegistration = (): UseUserRegistration => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async ({
    email,
    password,
    name,
    date,
    gender,
  }: CreateUserFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          date,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Optionally, you can handle the response here if needed
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, registerUser };
};

export { useUserRegistration };

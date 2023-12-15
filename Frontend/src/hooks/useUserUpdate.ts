// useUserRegistration.ts

import { UpdateUserFormData } from "@/app/(private)/edicao/page";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

interface UseUserUpdate {
  isLoading: boolean;
  error: string | null;
  updateUser: ({
    email,
    name,
    date,
    gender,
  }: UpdateUserFormData) => Promise<void>;
}

const useUserUpdate = (): UseUserUpdate => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, setUser, isAuthenticated } = useContext<AuthContextType>(AuthContext);

  const updateUser = async ({
    email,
    name,
    date,
    gender,
  }: UpdateUserFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/users/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          date,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      // Optionally, you can handle the response here if needed
    } catch (err) {
      setError("An error occurred during update");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateUser };
};

export { useUserUpdate };

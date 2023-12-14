import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  date: string;
  gender: string;
  // Add other user properties as needed
}

interface UseUserListing {
  isLoading: boolean;
  error: string | null;
  users: User[] | null;
  listUsers: () => Promise<void>;
}

const useUserListing = (): UseUserListing => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const listUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("An error occurred while fetching users");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    listUsers();
  }, []); // Empty dependency array to ensure it runs only once

  return { isLoading, error, users, listUsers };
};

export { useUserListing };

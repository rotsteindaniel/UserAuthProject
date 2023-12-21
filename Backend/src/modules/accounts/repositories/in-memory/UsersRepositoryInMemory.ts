import { v4 as uuid } from "uuid";

import { User } from "../User";
import { IUser } from "@modules/accounts/interfaces/IUser";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, date, gender, password }: IUser): Promise<void> {
    const user = new User({
      id: uuid(),
      email,
      name,
      date,
      gender,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(updatedUser: User): Promise<void> {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);

    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

export { UsersRepositoryInMemory };

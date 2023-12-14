import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../User";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User({
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(updatedUser: User): Promise<void> {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);

    if (index !== -1) {
      // Substitua o usuário na posição encontrada com o usuário atualizado
      this.users[index] = updatedUser;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      // Remova o usuário da posição encontrada
      this.users.splice(index, 1);
    }
  }
}

export { UsersRepositoryInMemory };

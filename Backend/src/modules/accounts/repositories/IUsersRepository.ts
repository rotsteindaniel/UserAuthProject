import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "./User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  save(updatedUser: User): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };

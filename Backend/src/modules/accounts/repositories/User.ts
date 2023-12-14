import { IUser } from "../dtos/IUser";

class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  // You can initialize the properties in the constructor if needed
  constructor({ id, name, email, password, token }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}

export { User };

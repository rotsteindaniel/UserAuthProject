import { IUser } from "../interfaces/IUser";

class User {
  id?: string;
  name?: string;
  email?: string;
  date?: string;
  gender?: string;
  password?: string;
  token?: string;
  // You can initialize the properties in the constructor if needed
  constructor({ id, name, email, date, gender, password, token }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.date = date;
    this.gender = gender;
    this.password = password;
    this.token = token;
  }
}

export { User };

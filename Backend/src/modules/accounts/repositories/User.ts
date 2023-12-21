import { IUser } from "../interfaces/IUser";

class User {
  id?: string;
  name?: string;
  email?: string;
  date?: string;
  gender?: string;
  password?: string;
  token?: string;

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

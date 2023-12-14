import { classToClass } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../repositories/User";

class UserMap {
  static toDTO({ email, name, id }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
    });
    return user;
  }
}

export { UserMap };

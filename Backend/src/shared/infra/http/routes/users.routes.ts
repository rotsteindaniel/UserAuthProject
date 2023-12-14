import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetUserProfileController } from "@modules/accounts/useCases/getProfileUser/GetProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const getUserProfileController = new GetUserProfileController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);

usersRoutes.get("/profile", ensureAuthenticated, getUserProfileController.handle);
usersRoutes.put("/profile/update", ensureAuthenticated, updateUserController.handle);
usersRoutes.delete("/profile/delete", ensureAuthenticated, deleteUserController.handle);

export { usersRoutes };

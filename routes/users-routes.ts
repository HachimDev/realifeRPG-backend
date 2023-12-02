import express, { Router } from "express";
import UsersController from "../controllers/users-controller";

const userRouter: Router = express.Router();

// ENDPOINT = /api/users

// GET USER DATA BY ID
userRouter.get("/:uid", UsersController.getUserById);

// GET LIST OF USERS
userRouter.get("/", UsersController.getUsers);

// SIGNUP
userRouter.post("/signup", UsersController.signup);
// LOGIN
userRouter.post("/login", UsersController.login);

export default userRouter;

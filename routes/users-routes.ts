import express, { Router } from "express";
import UsersController from "../controllers/users-controller";

const userRouter: Router = express.Router();

// GET USER BY ID
userRouter.get("/:uid", UsersController.getUserById);

export default userRouter;

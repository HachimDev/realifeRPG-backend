import express, { Router } from "express";
import UsersController from "../controllers/users-controller";
import { check } from "express-validator";

const userRouter: Router = express.Router();

// ENDPOINT = /api/users

// GET USER DATA BY ID
userRouter.get("/:uid", UsersController.getUserById);

// GET LIST OF USERS
userRouter.get("/", UsersController.getUsers);

// SIGNUP
// const { username, email, password, characterName } = req.body;
userRouter.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
    check("characterName").not().isEmpty(),
  ],
  UsersController.signup
);
// LOGIN
userRouter.post("/login", UsersController.login);

export default userRouter;

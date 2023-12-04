import { RequestHandler } from "express";
import { dummyUsers } from "../utils/dummyData";
import HttpError from "../models/http-error";
import { IUser } from "../utils/interfaces";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import UserSchema from "../models/userModel";

class UsersController {
  getUserById: RequestHandler = (req, res, next) => {
    const userId = req.params.uid;
    const user = dummyUsers.find((u) => u.id === userId);

    if (!user) {
      return next(new HttpError("Could not find the user for the provided id", "404"));
    }

    res.json({ user });
  };

  getUsers: RequestHandler = async (req, res, next) => {
    let listUsers;
    try {
      listUsers = await UserSchema.find({}, "email username");
      // listUsers = await UserSchema.find({}, "-password");
    } catch (error) {
      return next(new HttpError("Fetching users failed, please try again later", "500"));
    }
    res.json({ users: listUsers.map((user) => user.toObject({ getters: true })) });
  };

  // SIGNUP CONTROLLER
  signup: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422);
      return next(new HttpError("Invalid inputs passed, please check your data", "422"));
    }
    const { username, email, password, characterName } = req.body;

    let existingUser;
    try {
      existingUser = await UserSchema.findOne({ email: email });
    } catch (err) {
      const error = new HttpError("Signing up failed, please try again later", "500");
      next(error);
    }

    if (existingUser) {
      const error = new HttpError("User exists already, please login instead", "422");
      return next(error);
    }

    const createdUser = new UserSchema({
      username,
      email,
      password,
      character: {
        name: characterName,
        stamina: 100,
        gold: 0,
        experience: {
          level: 1,
          currentExp: 0,
          expToNextLevel: 150,
        },
        attributes: {
          strength: 1,
          dexterity: 1,
          intelect: 1,
          charisma: 1,
          luck: 1,
        },
      },
    });

    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError("Signing up failed, please try again later", "500");
      return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
  };

  // LOGIN CONTROLLER
  login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await UserSchema.findOne({ email: email });
    } catch (err) {
      return next(new HttpError("Logging in failed, please try again later", "500"));
    }

    if (!existingUser || existingUser.password !== password) {
      return next(new HttpError("Invalid credentials, could not log you in", "401"));
    }

    res.status(200).json({ message: "Logged in!" });
  };
}

export default new UsersController();

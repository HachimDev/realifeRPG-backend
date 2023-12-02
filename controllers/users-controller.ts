import { RequestHandler } from "express";
import { dummyUsers } from "../utils/dummyData";
import HttpError from "../models/http-error";
import { IUser } from "../utils/interfaces";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

class UsersController {
  getUserById: RequestHandler = (req, res, next) => {
    const userId = req.params.uid;
    const user = dummyUsers.find((u) => u.id === userId);

    if (!user) {
      return next(new HttpError("Could not find the user for the provided id", "404"));
    }

    res.json({ user });
  };

  getUsers: RequestHandler = (req, res, next) => {
    res.json({ users: dummyUsers });
  };

  signup: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422);
      return next(new HttpError("Invalid inputs passed, please check your data", "422"));
    }
    const { username, email, password, characterName } = req.body;

    const hasUser = dummyUsers.find((u) => u.email === email);
    if (hasUser) {
      return next(new HttpError("Could not create user, email already exists", "422"));
    }

    const createdUser: IUser = {
      id: uuidv4(),
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
    };

    dummyUsers.push(createdUser);

    res.status(201).json({ user: createdUser });
  };

  login: RequestHandler = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = dummyUsers.find((u) => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
      return next(new HttpError("Could not find a user for the provided credentials", "401"));
    }
    res.status(200).json({ message: "Logged in!" });
  };
}

export default new UsersController();

import { RequestHandler } from "express";
import { dummyUsers } from "../utils/dummyData";
import HttpError from "../models/http-error";

class UsersController {
  getUserById: RequestHandler = (req, res, next) => {
    const userId = req.params.uid;
    const user = dummyUsers.find((u) => u.id === userId);

    if (!user) {
      return next(new HttpError("Could not find the user for the provided id", "404"));
    }

    res.json({ user });
  };
}

// export { getUserById };

export default new UsersController();

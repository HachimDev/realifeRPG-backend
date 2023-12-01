import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import questRoute from "./routes/quests-routes";
import userRoute from "./routes/users-routes";
import HttpError from "./models/http-error";

const app: Express = express();

app.use(bodyParser.json());

app.use("/api/quests", questRoute);

app.use("/api/users", userRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", "404");
  throw error;
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(Number(error.name) || 500);
  res.json({ message: error.message, codeError: error.name || "An unknown error occurred!" });
});

app.listen(5000);

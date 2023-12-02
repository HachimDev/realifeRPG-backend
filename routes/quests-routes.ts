import express, { Router } from "express";
import QuestController from "../controllers/quests-controller";
import { check } from "express-validator";

const questRouter: Router = express.Router();

// GET QUEST BY ID
questRouter.get("/:qid", QuestController.getQuestById);

// GET QUESTS LIST BY USER ID
questRouter.get("/user/:uid", QuestController.getQuestsByUserId);

// CREATE QUEST
questRouter.post(
  "/",
  [check("title").not().isEmpty(), check("userId").not().isEmpty(), check("rewards").isObject()],
  QuestController.createQuest
);

// UPDATE QUEST BY ID
questRouter.patch("/:qid", QuestController.updateQuestbyId);

// DELETE QUEST BY ID
questRouter.delete("/:qid", QuestController.deleteQuestById);

export default questRouter;

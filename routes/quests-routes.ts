import express, { Router } from "express";
// import {
//   createQuest,
//   deleteQuestById,
//   getQuestById,
//   getQuestsByUserId,
//   updateQuestById,
// } from "../controllers/quests-controller";

import QuestController from "../controllers/quests-controller";

const questRouter: Router = express.Router();

// GET QUEST BY ID
questRouter.get("/:qid", QuestController.getQuestById);

// GET QUESTS LIST BY USER ID
questRouter.get("/user/:uid", QuestController.getQuestsByUserId);

questRouter.post("/", QuestController.createQuest);

questRouter.patch("/:qid", QuestController.updateQuestById);

questRouter.delete("/:qid", QuestController.deleteQuestById);

export default questRouter;

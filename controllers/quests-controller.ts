import { RequestHandler } from "express";
import { dummyQuests } from "../utils/dummyData";
import HttpError from "../models/http-error";
import { v4 as uuidv4 } from "uuid";
import { IQuest } from "../utils/interfaces";

class QuestController {
  getQuestById: RequestHandler = (req, res, next) => {
    const questId = req.params.qid;
    const quest = dummyQuests.find((q) => q.id === questId);

    if (!quest) {
      return next(new HttpError("Could not find a quest for the provided id", "404"));
    }

    res.json({ quest });
  };

  getQuestsByUserId: RequestHandler = (req, res, next) => {
    const userId = req.params.uid;
    const quests = dummyQuests.filter((q) => q.userId === userId);

    if (!quests || quests.length === 0) {
      return next(new HttpError("Could not find quests for the provided user id", "404"));
    }

    res.json({ quests });
  };

  createQuest: RequestHandler = (req, res, next) => {
    const { userId, title, description, rewards, isDaily, isWeekly, expirationDate, type } =
      req.body;
    const createdQuest = {
      id: uuidv4(),
      title,
      description,
      rewards,
      completed: false,
      isDaily,
      isWeekly,
      expirationDate,
      type,
      userId,
    };

    dummyQuests.push(createdQuest);

    res.status(201).json({ quest: createdQuest });
  };

  /* The `updateQuestById` function is a request handler that is responsible for updating a quest in
  the `dummyQuests` array based on the provided quest ID (`qid`) in the request parameters. */
  updateQuestById: RequestHandler = (req, res, next) => {
    const { title, description, rewards, isDaily, isWeekly, expirationDate, type, completed } =
      req.body;
    const questId = req.params.qid;
    const questIndex = dummyQuests.findIndex((q) => q.id === questId);

    if (questIndex === -1) {
      return next(new HttpError("Could not find a quest for the provided id", "404"));
    }

    const questToUpdate: IQuest = {
      ...dummyQuests[questIndex],
      title,
      description,
      rewards,
      isDaily,
      isWeekly,
      expirationDate,
      type,
      completed,
    };

    dummyQuests[questIndex] = questToUpdate;

    res.json({ quest: questToUpdate });
  };

  deleteQuestById: RequestHandler = (req, res, next) => {
    const questId = req.params.qid;
    const questIndex = dummyQuests.findIndex((q) => q.id === questId);
    dummyQuests.splice(questIndex, 1);

    res.json({ message: "Quest with id " + questId + " deleted successfully" });
  };
}

// export { getQuestById, getQuestsByUserId, createQuest, updateQuestById, deleteQuestById };

export default new QuestController();

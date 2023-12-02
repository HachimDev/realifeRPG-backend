import { RequestHandler } from "express";
import { dummyQuests } from "../utils/dummyData";
import HttpError from "../models/http-error";
import { v4 as uuidv4 } from "uuid";
import { IPatchData, IQuest } from "../utils/interfaces";
import { validationResult } from "express-validator";

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422);
      return next(new HttpError("Invalid inputs passed, please check your data", "422"));
    }

    const { userId, title, description, rewards, isDaily, isWeekly, expirationDate, type } =
      req.body;
    // validate request body

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

  updateQuestbyId: RequestHandler = (req, res, next) => {
    const dataToPatch: IPatchData[] = req.body;
    const questId = req.params.qid;
    const questIndex = dummyQuests.findIndex((q) => q.id === questId);

    if (questIndex === -1) {
      return next(new HttpError("Could not find a quest for the provided id", "404"));
    }

    let questToUpdate = { ...dummyQuests[questIndex] };

    dataToPatch.forEach((patch) => {
      if (patch.op === "replace") {
        // remove the first character of the path (a slash)
        let path = patch.path.slice(1);

        (questToUpdate as any)[path] = patch.value;
      }
    });

    dummyQuests[questIndex] = questToUpdate;

    res.json({ quest: questToUpdate });
  };

  deleteQuestById: RequestHandler = (req, res, next) => {
    const questId = req.params.qid;
    if (!dummyQuests.find((q) => q.id === questId)) {
      return next(new HttpError("Could not find a quest for the provided id", "404"));
    }
    const questIndex = dummyQuests.findIndex((q) => q.id === questId);
    dummyQuests.splice(questIndex, 1);

    res.json({ message: "Quest with id " + questId + " deleted successfully" });
  };
}

// export { getQuestById, getQuestsByUserId, createQuest, updateQuestById, deleteQuestById };

export default new QuestController();

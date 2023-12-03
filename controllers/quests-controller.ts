import { RequestHandler } from "express";
import { dummyQuests } from "../utils/dummyData";
import HttpError from "../models/http-error";
import { IPatchData, IQuest } from "../utils/interfaces";
import { validationResult } from "express-validator";
import QuestSchema from "../models/questModel";
import mongoose from "mongoose";

class QuestController {
  // GET QUEST BY ID
  getQuestById: RequestHandler = async (req, res, next) => {
    const questId = req.params.qid;
    let quest: mongoose.Document<any, any, IQuest> | null;

    try {
      quest = await QuestSchema.findById(questId);
    } catch (err) {
      console.log(err);
      const error = new HttpError("Something went wrong, could not find a quest", "500");
      return next(error);
    }

    if (!quest) {
      const error = new HttpError("Could not find a quest for the provided id", "404");
      return next(error);
    }

    res.json({ quest: quest.toObject({ getters: true }) });
  };

  // GET QUESTS LIST BY USER ID
  getQuestsByUserId: RequestHandler = async (req, res, next) => {
    const userId = req.params.uid;
    // const quests = dummyQuests.filter((q) => q.userId === userId);
    let quests: mongoose.Document<any, any, IQuest>[];
    try {
      quests = await QuestSchema.find({ userId: userId }).exec();
    } catch (err) {
      console.log(err);
      const error = new HttpError("Fetching quests failed, please try again later", "500");
      return next(error);
    }

    if (!quests || quests.length === 0) {
      return next(new HttpError("Could not find quests for the provided user id", "404"));
    }

    res.json({ quests: quests.map((quest) => quest.toObject({ getters: true })) });
  };

  // CREATE A NEW QUEST
  createQuest: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422);
      return next(new HttpError("Invalid inputs passed, please check your data", "422"));
    }

    const {
      userId,
      title,
      description,
      rewards,
      isDaily,
      isWeekly,
      completed,
      expirationDate,
      type,
    } = req.body;
    // validate request body

    const createdQuest = new QuestSchema({
      userId,
      title,
      description,
      rewards,
      isDaily,
      isWeekly,
      completed,
      expirationDate,
      type,
    });
    try {
      await createdQuest.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError("Creating quest failed, please try again", "500");
      return next(error);
    }

    res.status(201).json({ quest: createdQuest });
  };

  // UPDATE A QUEST BY ID
  updateQuestbyId: RequestHandler = async (req, res, next) => {
    const dataToPatch: IPatchData[] = req.body;
    const questId = req.params.qid;

    let questToUpdate: mongoose.Document<any, any, IQuest> | null;

    try {
      questToUpdate = await QuestSchema.findById(questId);
    } catch (err) {
      console.log(err);
      const error = new HttpError("Something went wrong, could not find the quest", "500");
      return next(error);
    }

    dataToPatch.forEach((patch) => {
      if (patch.op === "replace") {
        let path = patch.path.slice(1); // remove the first character of the path (a slash)

        (questToUpdate as any)[path] = patch.value;
      }
    });

    try {
      await questToUpdate?.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError("Something went wrong, could not update", "500");
      return next(error);
    }

    res.json({ quest: questToUpdate?.toObject({ getters: true }) });
  };

  // DELETE A QUEST BY ID
  deleteQuestById: RequestHandler = async (req, res, next) => {
    const questId = req.params.qid;

    try {
      await QuestSchema.deleteOne({ _id: questId });
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not find the quest to delete",
        "500"
      );
      return next(error);
    }
    res.json({ message: "Quest with id " + questId + " deleted successfully" });
  };
}

// export { getQuestById, getQuestsByUserId, createQuest, updateQuestById, deleteQuestById };

export default new QuestController();

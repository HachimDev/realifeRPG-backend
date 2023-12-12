import mongoose, { Model } from "mongoose";
import { IQuest } from "../utils/interfaces";

const Schema = mongoose.Schema;

const questShema = new Schema<IQuest>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, required: true },
  isDaily: { type: Boolean, required: false },
  isWeekly: { type: Boolean, required: false },
  expirationDate: { type: Date, required: false },
  type: { type: Number, required: true },
  rewards: {
    gold: { type: Number },
    experience: { type: Number, required: true },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.model<IQuest>("Quest", questShema);

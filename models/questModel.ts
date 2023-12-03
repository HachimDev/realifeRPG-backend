import mongoose from "mongoose";
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
  userId: { type: String, required: true },
});

export default mongoose.model<IQuest>("Quest", questShema);

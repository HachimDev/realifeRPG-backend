import mongoose from "mongoose";
import { IUser } from "../utils/interfaces";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  character: {
    name: { type: String, required: true },
    stamina: { type: Number, required: true },
    gold: { type: Number, required: true },
    experience: {
      level: { type: Number, required: true },
      currentExp: { type: Number, required: true },
      expToNextLevel: { type: Number, required: true },
    },
    attributes: {
      strength: { type: Number, required: true },
      dexterity: { type: Number, required: true },
      intelect: { type: Number, required: true },
      charisma: { type: Number, required: true },
      luck: { type: Number, required: true },
    },
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>("User", userSchema);

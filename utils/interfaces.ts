import mongoose from "mongoose";

export interface IReward {
  gold?: number;
  experience: number;
}
export interface IQuest {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  isDaily: boolean;
  isWeekly: boolean;
  expirationDate: Date;
  type: number;
  rewards: IReward;
  userId: mongoose.Types.ObjectId;
}

export interface IAttributes {
  strength: number;
  dexterity: number;
  intelect: number;
  charisma: number;
  luck: number;
}
export interface IexperienceData {
  level: number;
  currentExp: number;
  expToNextLevel: number;
}

export interface ICharacter {
  name: string;
  stamina: number;
  gold: number;
  experience: IexperienceData;
  attributes: IAttributes;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  character: ICharacter;
}

export interface IPatchData {
  op: string;
  path: string;
  value: any;
}

import { IQuest, IUser } from "./interfaces";

export const dummyQuests: IQuest[] = [
  {
    id: "q1",
    title: "Finish the course",
    description: "Finish the course as soon as possible",
    rewards: {
      experience: 100,
      gold: 100,
    },
    completed: false,
    isDaily: false,
    isWeekly: false,
    expirationDate: new Date(),
    type: 1,
    userId: "u1",
  },
  {
    id: "q2",
    title: "Finish the course2",
    description: "Finish the course too",
    rewards: {
      experience: 200,
      gold: 200,
    },
    completed: false,
    isDaily: false,
    isWeekly: false,
    expirationDate: new Date(),
    type: 2,
    userId: "u2",
  },
  {
    id: "q3",
    title: "working out",
    description: "1h workout",
    rewards: {
      experience: 100,
      gold: 100,
    },
    completed: false,
    isDaily: false,
    isWeekly: false,
    expirationDate: new Date(),
    type: 1,
    userId: "u1",
  },
];

export const dummyUsers: IUser[] = [
  {
    id: "u1",
    username: "user1",
    email: "user1@users.us",
    password: "123456",
    character: {
      name: "Test1",
      stamina: 100,
      gold: 100,
      experience: {
        level: 1,
        currentExp: 0,
        expToNextLevel: 100,
      },
      attributes: {
        strength: 10,
        dexterity: 10,
        intelect: 10,
        charisma: 10,
        luck: 10,
      },
    },
  },
  {
    id: "u2",
    username: "user2",
    email: "user2@users.us",
    password: "123456",
    character: {
      name: "Test2",
      stamina: 100,
      gold: 100,
      experience: {
        level: 1,
        currentExp: 0,
        expToNextLevel: 100,
      },
      attributes: {
        strength: 10,
        dexterity: 10,
        intelect: 10,
        charisma: 10,
        luck: 10,
      },
    },
  },
];

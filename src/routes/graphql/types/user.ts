//import { IProfile } from "./profile.js";
export interface IUser {
  id?: string,
  name: string,
  balance: number,
 // profile: IProfile,
  userSubscribedTo?: {
    subscriberId: string,
    authorId: string,
  }[],
  subscribedToUser?: {
    subscriberId: string,
    authorId: string,
  }[],
}

export interface ICreateUser {
  dto: {
    name: string,
    balance: number,
  }
}
export interface IChangeUser {
  id: string,
  dto: {
    name: string,
    balance: number,
  }
}

export interface userSubscribedTo {
    userId: string,
    authorId: string,
}
export interface subscribedToUser {
    userId: string,
    authorId: string,
}
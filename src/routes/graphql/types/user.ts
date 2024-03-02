//import { IProfile } from "./profile.js";
export interface IUser {
  id?: string,
  name: string,
  balance: number,
 // profile: IProfile,
  UserSubscribedTo?: {
    subscriberId: string,
    authorId: string,
  }[],
  SubscribedToUser?: {
    subscriberId: string,
    authorId: string,
  }[],
}

export interface ICreateUser {
  userData: {
    name: string,
    balance: number,
  }
}

export interface UserSubscribedTo {
    subscriberId: string,
    authorId: string,
}
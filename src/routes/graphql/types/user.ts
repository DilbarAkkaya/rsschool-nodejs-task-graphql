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
  userData: {
    name: string,
    balance: number,
  }
}
export interface IChangeUser {
  id: string,
  userData: {
    name: string,
    balance: number,
  }
}

export interface userSubscribedTo {
    subscriberId: string,
    authorId: string,
}
export interface subscribedToUser {
    subscriberId: string,
    authorId: string,
}
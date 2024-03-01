import { IProfile } from "./profile.js";
export interface IUser {
  id?: string,
  name: string,
  balance: number,
  profile: IProfile,
  UserSubscribedTo: {
    authotId: string,
  }[],
  SubscribedToUser: {
    authotId: string,
  }[],
}

export interface ICreateUser {
  name: string,
  balance: number,
}
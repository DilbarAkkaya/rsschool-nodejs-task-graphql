import { IProfile } from "./profile.js";
export interface IUser {
  id?: string,
  name: string,
  balance: number,
  profile: IProfile,
  UserSubscribedTo?: {
    suscriberId: string,
    authotId: string,
  }[],
  SubscribedToUser?: {
    suscriberId: string,
    authotId: string,
  }[],
}

export interface ICreateUser {
  userData: {
    name: string,
    balance: number,
  }

}
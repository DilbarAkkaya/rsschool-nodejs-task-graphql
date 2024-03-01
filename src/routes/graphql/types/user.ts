export interface IUser {
  id: string,
  name: string,
  balance: number,
  UserSubscribedTo: {
    authotId: string,
  }[],
  SubscribedToUser: {
    authotId: string,
  }[],
}
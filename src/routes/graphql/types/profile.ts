
export interface IProfile {
  id: string,
  isMale: boolean,
  yearOfBirth: 0,
  userId:string,
  memberTypeId: string
}
export interface ICreateProfile {
  dto:{
    isMale: boolean,
    yearOfBirth: 0,
    userId:string,
    memberTypeId: string
  }
}
export interface IChangeProfile {
  id: string,
  dto:{
    isMale: boolean,
    yearOfBirth: 0,
    memberTypeId: string,
  }
}
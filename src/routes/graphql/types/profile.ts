
export interface IProfile {
  id: string,
  isMale: boolean,
  yearOfBirth: 0,
  userId:string,
  memberTypeId: string
}
export interface ICreateProfile {
  profileData:{
    isMale: boolean,
    yearOfBirth: 0,
    userId:string,
    memberTypeId: string
  }
}
export interface IChangeProfile {
  id: string,
  profileData:{
    isMale: boolean,
    yearOfBirth: 0,
    memberTypeId: string
  }
}
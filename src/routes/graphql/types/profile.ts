
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
export interface IPOST {
  id: string,
  title: string,
  content: string,
  authorId: string,
}
export interface ICreatePost {
 dto: {
    authorId: string,
    title: string,
    content: string,
  }

}
export interface IChangePost {
  id: string,
  dto: {
    authorId: string,
    title: string,
    content: string,
  }

}
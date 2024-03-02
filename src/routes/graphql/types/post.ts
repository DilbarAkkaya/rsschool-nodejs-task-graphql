export interface IPOST {
  id: string,
  title: string,
  content: string,
  authorId: string,
}
export interface ICreatePost {
  postData: {
    authorId: string,
    title: string,
    content: string,
  }

}
export interface IChangePost {
  id: string,
  postData: {
    authorId: string,
    title: string,
    content: string,
  }

}
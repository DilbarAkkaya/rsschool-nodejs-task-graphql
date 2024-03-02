
import { GraphQLObjectType } from 'graphql';
import { IContext } from '../graphql/types/context.js';
import { PostType } from '../graphql/types/postType.js';
import { UserType } from './types/userType.js';
import { ICreateUser } from './types/user.js';
import { ICreatePost } from './types/post.js';
import { createUserType } from './types/userType.js';
import { createPostType } from '../graphql/types/postType.js';

export const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { userData: { type: createUserType } },
      resolve: async (_parent, _args: ICreateUser, _context: IContext) => {
        const db = _context.db;
        const newUser = await db.user.create({data: _args.userData});
        return newUser;
      },
    },
    createPost: {
      type: PostType,
      args: {
        postData: {type: createPostType},
      },
      resolve: async (_parent, _args: ICreatePost, _context: IContext) => {
        const db = _context.db;
        const newPost = await db.post.create({data: _args.postData});
        return newPost;
      },
    },
    changePost: {
      type: PostType,
      args: {
        postData: {type: createPostType},
      },
      resolve: async (_parent, _args: ICreatePost, _context: IContext) => {
        const db = _context.db;
        const newPost = await db.post.create({data: _args.postData});
        return newPost;
      },
    },
  },
});
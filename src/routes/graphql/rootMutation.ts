
import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { IContext } from '../graphql/types/context.js';
import { PostType } from '../graphql/types/postType.js';
import { UserType } from './types/queryTypes.js';
import { ICreateUser } from './types/user.js';
import { ICreatePost } from './types/post.js';
import { createUserType, createPostType } from './types/queryTypes.js';

export const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { userData: { type: new GraphQLNonNull(createUserType) } },
      resolve: async (_parent, _args: ICreateUser, _context: IContext) => {
        const db = _context.db;
        const newUser = await db.user.create({data: _args.userData});
        return newUser;
      },
    },
    createPost: {
      type: PostType,
      args: {
        postData: {type: new GraphQLNonNull(createPostType)},
      },
      resolve: async (_parent, _args: ICreatePost, _context: IContext) => {
        const db = _context.db;
        const newPost = await db.post.create({data: _args.postData});
        return newPost;
      },
    },
  },
});
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { IContext } from '../graphql/types/context.js';
import { IUser } from '../graphql/types/user.js';
import { UUIDType } from '../graphql/types/uuid.js';
import { IPOST } from '../graphql/types/post.js';
import { PostType } from '../graphql/types/postType.js';
import { ProfileType } from '../graphql/types/profileType.js';
import { UserType } from './types/queryTypes.js';


export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, _context: IContext) => {
        const data = await _context.db.user.findMany();
        return data;
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (_, _args: IUser, _context: IContext) => {
        const db = _context.db;
        return await db.user.findFirst({ where: { id: _args.id } })
      }
    },
    post: {
      type: PostType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (_parent, _args: IPOST, _context: IContext) => {
        const db = _context.db;
        return await db.post.findFirst({ where: { id: _args.id } })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, _context: IContext) => {
        const data = await _context.db.post.findMany();
        return data;
      }
    },
  }
})
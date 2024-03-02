import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { IContext } from '../graphql/types/context.js';
import { IUser } from '../graphql/types/user.js';
import { UUIDType } from '../graphql/types/uuid.js';
import { IPOST } from '../graphql/types/post.js';
import { PostType } from '../graphql/types/postType.js';
import { ProfileType } from '../graphql/types/profileType.js';
import { UserType } from './types/userType.js';
import { IProfile } from './types/profile.js';
import { MemberType, enumMemberId } from './types/memberTypeType.js';
import { IMemberType } from './types/memberType.js';


export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, _context: IContext) => {
        await _context.db.user.findMany();

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
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_parent, _args: IPOST, _context: IContext) => {
        const db = _context.db;
        return await db.post.findFirst({ where: { id: _args.id} })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, _context: IContext) => {
        const data = await _context.db.post.findMany();
        return data;
      }
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, _arg: IProfile, _context: IContext) =>{
       const result = await _context.db.profile.findFirst({ where: { id: _arg.id } });
       return result;
      }
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, __, _context: IContext) =>
        await _context.db.profile.findMany({}),
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(enumMemberId) },
      },
      resolve: async (_parent, _args: IMemberType, _context: IContext) =>
        await _context.db.memberType.findFirst({ where: { id: _args.id } }),
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_parent, _arg, _context) => await _context.db.memberType.findMany(),
    },
  })
})
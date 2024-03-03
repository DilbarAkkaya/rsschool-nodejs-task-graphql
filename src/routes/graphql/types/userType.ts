import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { IContext } from './context.js';
import { IUser } from './user.js';
import { UUIDType } from './uuid.js';
import { PostType } from './postType.js';
import { ProfileType } from './profileType.js';
//import { IProfile } from './profile.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  description: 'User in DB',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async (_parent: IUser, _, _context: IContext) => {
        const db = _context.db;
        return await db.profile.findFirst({ where: { userId: _parent.id } })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_parent: IUser, _, _context: IContext) => {
        const db = _context.db;
        return await db.post.findMany({ where: { authorId: _parent.id } })
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (_parent: IUser, _, _context: IContext) => {
        const userSubscribedUsers = await _context.db.subscribersOnAuthors.findMany({
          where: { subscriberId: _parent.id }, include: { author: true } });
        return userSubscribedUsers.map((item) => item.author)
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (_parent: IUser, _, _context: IContext) => {
        const thisUserSuscribers = await _context.db.subscribersOnAuthors.findMany({
          where: { authorId: _parent.id },
          include: { subscriber: true }
        });
        return thisUserSuscribers.map((item) => item.subscriber);
      }
    },
  })
})


export const createUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => (
    {
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLFloat) },
    })
})

export const changeUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => (
    {
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
    })
})
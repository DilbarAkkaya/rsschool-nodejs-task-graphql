import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt } from 'graphql';
import { IContext } from './context.js';
import { IUser } from './user.js';

export const UserType:GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User in DB',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
       type: ProfileType,
       resolve: async (_parent: IUser, _args, _context: IContext)=> {
        const db = _context.db;
        return await db.profile.findFirst({where: {id: _parent.id} })
      }
     },
    UserSubscribedTo: { type: new GraphQLList(GraphQLString) },
    SubscribedToUser: { type: new GraphQLList(GraphQLString) }
  })
});
export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  description: 'User profile',
  fields: () => ({
    id: { type: GraphQLString },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (_parent: IUser, _args, _context: IContext)=> {
        const db = _context.db;
        return await db.user.findFirst({where: {id: _parent.id} })
      }
    }
  })
});
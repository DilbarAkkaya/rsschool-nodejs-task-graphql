import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';
import { IContext } from './context.js';
import { IUser } from './user.js';
import { UUIDType } from './uuid.js';
import { UserType } from './queryTypes.js';
export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  description: 'User profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (_parent: IUser, _args, _context: IContext) => {
        const db = _context.db;
        return await db.user.findFirst({ where: { id: _parent.id } })
      }
    }
  })
});

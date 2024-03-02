import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { IContext } from './context.js';
import { IUser } from './user.js';
import { UUIDType } from './uuid.js';
import { UserType } from './userType.js';
import { enumMemberId } from './memberTypeType.js';
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
        await _context.db.profile.findFirst({ where: { userId: _parent.id } })
      }
    }
  })
});
export const createProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => (
    {
      userId: { type: new GraphQLNonNull(UUIDType) },
      isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
      yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
      memberTypeId: {type: new GraphQLNonNull(enumMemberId)}
    })
})
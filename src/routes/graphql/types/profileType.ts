import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { IContext } from './context.js';
import { UUIDType } from './uuid.js';
import { UserType } from './userType.js';
import { MemberType, enumMemberId } from './memberTypeType.js';
import { IProfile } from './profile.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  description: 'User profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: enumMemberId },
    user: {
      type: UserType,
      resolve: async (_parent:IProfile, _, _context: IContext) => {
       return await _context.db.user.findFirst({ where: { id: _parent.userId} })
      }
    },
    memberType: {
      type: MemberType,
      resolve: async (_parent:IProfile, _, _context:IContext) =>{
       return await _context.db.memberType.findFirst({ where: { id: _parent.memberTypeId } })
    
      }  },
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
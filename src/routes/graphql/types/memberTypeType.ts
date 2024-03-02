import { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLEnumType, GraphQLFloat } from 'graphql';
import { IContext } from './context.js';;
import { ProfileType } from './profileType.js';
import { IMemberType } from './memberType.js';

export const enumMemberId = new GraphQLEnumType({
  name: 'MemberTypeIdTypes',
  values: {
    basic: {value: 'basic',},
    business: {value: 'business',},
  }
})
export const MemberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'Member Type',
  fields: () => ({
    id: { type: enumMemberId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, _args: IMemberType, _context: IContext) => {
        await _context.db.profile.findMany({ where: { memberTypeId: _args.id } });
      },
    },
  })
});

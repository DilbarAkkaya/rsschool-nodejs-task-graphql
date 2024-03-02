import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { IContext } from './context.js';
import { IUser } from './user.js';
import { UUIDType } from './uuid.js';
import { PostType } from './postType.js';
import { ProfileType } from './profileType.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User in DB',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async (_parent: IUser, _, _context: IContext) => {
        const db = _context.db;
        return await db.profile.findFirst({ where: { id: _parent.id } })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_parent: IUser, _, _context: IContext) => {
        const db = _context.db;
        return await db.profile.findFirst({ where: { id: _parent.id } })
      }
    },
    UserSubscribedTo: { 
      type: new GraphQLList(UserType),
    resolve: async (_parent, _, _context: IContext)=> {
       const userSubArray = await _context.db.subscribersOnAuthors.findMany({where: {subscriberId: _parent.id}});
       return userSubArray.map((item)=> item.authorId)
    }
  },
    SubscribedToUser: { 
      type: new GraphQLList(UserType),
      resolve: async (_parent, _, _context: IContext) => {
        const results = await _context.db.subscribersOnAuthors.findMany({
          where: { authorId: _parent.id },
        });
        return results.map((result) => result.subscriberId);
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
export const createPostType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => (
    {
      authorId: { type: UUIDType },
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) }
    })
})


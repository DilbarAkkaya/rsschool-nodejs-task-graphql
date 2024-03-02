import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString,  GraphQLNonNull } from 'graphql';
import { IContext } from './context.js';
import { UUIDType } from './uuid.js';
import { IPOST } from './post.js';
import { UserType } from './userType.js';
export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post in DB',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async (_, _args: IPOST, _context: IContext) => {
        const db = _context.db;
        return await db.user.findFirst({ where: { id: _args.authorId } })
      }
    },

  })
});

export const createPostType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => (
    {
      authorId: { type: new GraphQLNonNull(UUIDType) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) }
    })
})

export const ChangePostType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    authorId: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});
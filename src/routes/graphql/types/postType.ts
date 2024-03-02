import { GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext } from './context.js';
import { UUIDType } from './uuid.js';
import { IPOST } from './post.js';
import { UserType } from './queryTypes.js';
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
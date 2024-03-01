import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { IContext } from './context.js';
import { ICreateUser, IUser } from './user.js';
import { UUIDType } from './uuid.js';
import { ICreatePost, IPOST } from './post.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User in DB',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async (_parent: IUser, _args, _context: IContext) => {
        const db = _context.db;
        return await db.profile.findFirst({ where: { id: _parent.id } })
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

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, _context: IContext) => {
        const data = await _context.db.user.findMany();
        return data;
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
        id: { type: UUIDType }
      },
      resolve: async (_parent, _args: IPOST, _context: IContext) => {
        const db = _context.db;
        return await db.post.findFirst({ where: { id: _args.id } })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, _context: IContext) => {
        const data = await _context.db.post.findMany();
        return data;
      }
    },
  }
})

export const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
      },
      resolve: async (_parent, _args: ICreateUser, _context: IContext) => {
        const db = _context.db;
        const newUser: ICreateUser = await db.user.create({
          data: {
            name: _args.name,
            balance: _args.balance,
          },
        });
        return newUser;
      },
    },
    createPost: {
      type: PostType,
      args: {
        authorId: { type: UUIDType },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_parent, _args: ICreatePost, _context: IContext) => {
        const db = _context.db;
        const newPost: ICreatePost = await db.post.create({
          data: {
            authorId: _args.authorId,
            title: _args.title,
            content: _args.content,
          },
        });
        return newPost;
      },
    },
  },
});
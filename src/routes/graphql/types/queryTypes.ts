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
      args: { userData: { type: new GraphQLNonNull(createUserType) } },
      resolve: async (_parent, _args: ICreateUser, _context: IContext) => {
        const db = _context.db;
        const newUser = await db.user.create({data: _args.userData});
        return newUser;
      },
    },
    createPost: {
      type: PostType,
      args: {
        postData: {type: new GraphQLNonNull(createPostType)},
      },
      resolve: async (_parent, _args: ICreatePost, _context: IContext) => {
        const db = _context.db;
        const newPost = await db.post.create({data: _args.postData});
        return newPost;
      },
    },
  },
});

import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IContext } from '../graphql/types/context.js';
import { ChangePostType, PostType } from '../graphql/types/postType.js';
import { UserType, changeUserType } from './types/userType.js';
import { IChangeUser, ICreateUser, IUser, UserSubscribedTo } from './types/user.js';
import { IChangePost, ICreatePost, IPOST } from './types/post.js';
import { createUserType } from './types/userType.js';
import { createPostType } from '../graphql/types/postType.js';
import { UUIDType } from './types/uuid.js';
import { ProfileType, createProfileType, changeProfileType } from './types/profileType.js';
import { IChangeProfile, ICreateProfile } from './types/profile.js';

export const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { userData: { type: createUserType } },
      resolve: async (_parent, _args: ICreateUser, _context: IContext) => {
        const db = _context.db;
        const newUser = await db.user.create({ data: _args.userData });
        return newUser;
      },
    },

    changeUser: {
      type: UserType,
      args: { id: { type: UUIDType }, userData: { type: changeUserType } },
      resolve: async (_parent,_args: IChangeUser, _context:IContext) =>
        await _context.db.user.update({ where: { id: _args.id }, data: _args.userData }),
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, _args: IUser,_context:IContext) => {
        try {
          await _context.db.user.delete({ where: { id: _args.id } });
        } catch (err) {
          return false;
        }
        return true;
      },
    },

    createPost: {
      type: PostType,
      args: {
        postData: { type: createPostType },
      },
      resolve: async (_parent, _args: ICreatePost, _context: IContext) => {
        const db = _context.db;
        const newPost = await db.post.create({ data: _args.postData });
        return newPost;
      },
    },

    changePost: {
      type: PostType,
      args: { id: { type: UUIDType }, postData: {type: ChangePostType }},
      resolve: async (_, _args: IChangePost, _context: IContext) => {
        const db = _context.db;
        const newPost = await db.post.update({where: {id: _args.id}, data: _args.postData });
        return newPost;
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, _args: IPOST, _context: IContext) => {
        try {
          const db = _context.db;
          await db.post.delete({ where: { id: _args.id } });
        } catch (err) {
          console.error(err);
          return false
        }
        return true
      },
    },

    createProfile: {
      type: ProfileType,
      args: { profileData: { type: createProfileType } },
      resolve: async (_parent, _args: ICreateProfile, _context: IContext) => {
        const db = _context.db;
        const newProfile = await db.profile.create({ data: _args.profileData });
        return newProfile;
      },
    },

    changeProfile: {
      type: ProfileType,
      args: { id: { type: UUIDType }, profileData: {type: changeProfileType }},
      resolve: async (_parent, _args: IChangeProfile, _context: IContext) => {
        const db = _context.db;
        const newProfile = await db.profile.update({where: {id: _args.id}, data: _args.profileData });
        return newProfile;
      },
    },

    subscribeTo: {
      type: UserType,
      args: { subscriberId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, _args: UserSubscribedTo, _context:IContext) => {
        await _context.db.subscribersOnAuthors.create({
          data: { subscriberId: _args.subscriberId, authorId: _args.authorId },
        });
        return await _context.db.user.findFirst({ where: { id: _args.subscriberId } });
      },
    },
  },
});
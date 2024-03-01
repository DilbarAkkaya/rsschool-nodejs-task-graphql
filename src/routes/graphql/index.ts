import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

export interface User {
  id: string,
  name: string,
  balance: number,
  posts: [],
  userSubscridebTo: []
}

export interface Profile {
  id: string,
  isMale: boolean,
  yearOfBirth: 0,
  userId:string,
  memberTypeId: string
}

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return {};
    },
  });
};

export default plugin;
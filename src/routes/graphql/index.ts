import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql } from 'graphql';




const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const db = fastify.prisma;
  const _context = {
    db: db
  }
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
      const data = await graphql({
        schema: schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: _context,
      });
      return data;
    },
  });
};

export default plugin;
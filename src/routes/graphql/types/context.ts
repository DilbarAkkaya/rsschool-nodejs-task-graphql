import { PrismaClient } from "@prisma/client";

export interface IContext {
  db: PrismaClient,
}
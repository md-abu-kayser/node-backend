import fjwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

export async function setupAuth(app: FastifyInstance) {
  await app.register(fjwt, {
    secret: env.JWT_SECRET,
  });

  app.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });
}

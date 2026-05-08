import { FastifyInstance } from "fastify";
import { signupHandler, loginHandler } from "./auth.controller";
import { signupSchema, loginSchema } from "./auth.schema";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signup", {
    schema: {
      body: signupSchema,
      response: {
        201: { token: { type: "string" }, user: { type: "object" } },
      },
    },
    handler: signupHandler,
  });

  app.post("/login", {
    schema: {
      body: loginSchema,
    },
    handler: loginHandler,
  });
}

import { FastifyRequest, FastifyReply } from "fastify";

export function authorize(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user;
    if (!user || !roles.includes(user.role)) {
      reply.status(403).send({ error: "Forbidden: insufficient permissions" });
    }
  };
}

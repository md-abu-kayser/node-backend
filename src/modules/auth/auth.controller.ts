import { FastifyRequest, FastifyReply } from "fastify";
import { signup, login } from "./auth.service";
import { SignupInput, LoginInput } from "./auth.schema";

export async function signupHandler(
  request: FastifyRequest<{ Body: SignupInput }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;
  const data = await signup(email, password);
  reply.status(201).send(data);
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;
  const data = await login(email, password);
  reply.send(data);
}

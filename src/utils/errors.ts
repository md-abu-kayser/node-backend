import { FastifyError, FastifyRequest, FastifyReply } from "fastify";

export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  error: FastifyError | AppError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  if (error.validation) {
    return reply
      .status(400)
      .send({ error: "Validation failed", details: error.validation });
  }

  request.log.error(error);
  return reply.status(500).send({ error: "Internal Server Error" });
};

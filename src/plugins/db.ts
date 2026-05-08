import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

export async function connectDB(app: FastifyInstance) {
  try {
    await mongoose.connect(env.MONGO_URI);
    app.log.info("MongoDB connected");
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    app.log.error(error);
    process.exit(1);
  }
}

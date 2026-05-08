import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

export async function connectDB(app: FastifyInstance) {
  try {
    await mongoose.connect(env.MONGO_URI);
    app.log.info("MongoDB connected");
  } catch (err) {
    app.log.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

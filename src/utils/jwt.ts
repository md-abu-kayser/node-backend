import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function generateToken(payload: object): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

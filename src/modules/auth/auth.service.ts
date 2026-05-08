import { User } from "../user/user.model";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { AppError } from "../../utils/errors";

export async function signup(email: string, password: string) {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError("Email already in use", 409);

  const hashed = await hashPassword(password);
  const user = await User.create({ email, password: hashed });

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  return { token, user: { id: user._id, email: user.email, role: user.role } };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid email or password", 401);

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new AppError("Invalid email or password", 401);

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  return { token, user: { id: user._id, email: user.email, role: user.role } };
}

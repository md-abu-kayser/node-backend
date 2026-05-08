import { Task } from "./task.model";
import { AppError } from "../../utils/errors";

export async function createTask(
  title: string,
  description: string | undefined,
  userId: string,
) {
  return Task.create({ title, description, userId });
}

export async function getTasks(userId: string, role: string) {
  if (role === "admin") return Task.find().populate("userId", "email");
  return Task.find({ userId });
}

export async function getTaskById(
  taskId: string,
  userId: string,
  role: string,
) {
  const task = await Task.findById(taskId);
  if (!task) throw new AppError("Task not found", 404);

  if (role !== "admin" && task.userId.toString() !== userId) {
    throw new AppError("Forbidden", 403);
  }
  return task;
}

export async function updateTask(
  taskId: string,
  userId: string,
  role: string,
  updates: { title?: string; description?: string; completed?: boolean },
) {
  const task = await getTaskById(taskId, userId, role);
  Object.assign(task, updates);
  return task.save();
}

export async function deleteTask(taskId: string, userId: string, role: string) {
  const task = await getTaskById(taskId, userId, role);
  await task.deleteOne();
  return { message: "Task deleted" };
}

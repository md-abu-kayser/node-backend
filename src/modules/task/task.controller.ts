import { FastifyRequest, FastifyReply } from "fastify";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.service";
import { CreateTaskInput, UpdateTaskInput } from "./task.schema";

export async function createHandler(
  request: FastifyRequest<{ Body: CreateTaskInput }>,
  reply: FastifyReply,
) {
  const { title, description } = request.body;
  const { id: userId } = request.user;
  const task = await createTask(title, description, userId);
  reply.status(201).send(task);
}

export async function getAllHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id: userId, role } = request.user;
  const tasks = await getTasks(userId, role);
  reply.send(tasks);
}

export async function getOneHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id: userId, role } = request.user;
  const task = await getTaskById(request.params.id, userId, role);
  reply.send(task);
}

export async function updateHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateTaskInput }>,
  reply: FastifyReply,
) {
  const { id: userId, role } = request.user;
  const updated = await updateTask(
    request.params.id,
    userId,
    role,
    request.body,
  );
  reply.send(updated);
}

export async function deleteHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id: userId, role } = request.user;
  const result = await deleteTask(request.params.id, userId, role);
  reply.send(result);
}

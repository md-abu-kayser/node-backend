import { FastifyInstance } from 'fastify';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import {
  createHandler,
  getAllHandler,
  getOneHandler,
  updateHandler,
  deleteHandler,
} from './task.controller';
import { createTaskSchema, updateTaskSchema } from './task.schema';

export async function taskRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate);

  app.post('/', {
    schema: { body: createTaskSchema },
    handler: createHandler,
  });

  app.get('/', handler: getAllHandler);

  app.get('/:id', handler: getOneHandler);

  app.put('/:id', {
    schema: { body: updateTaskSchema },
    handler: updateHandler,
  });

  app.delete('/:id', handler: deleteHandler);
}
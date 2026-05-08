import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { setupSwagger } from "./plugins/swagger";
import { setupAuth } from "./plugins/auth";
import { connectDB } from "./plugins/db";
import { authRoutes } from "./modules/auth/auth.route";
import { taskRoutes } from "./modules/task/task.route";
import { errorHandler } from "./utils/errors";
import { env } from "./config/env";

export async function startServer() {
  const app = Fastify({
    logger: {
      transport:
        env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
    },
  });

  // Plugins
  await app.register(cors, { origin: true, credentials: true });
  await app.register(helmet, { contentSecurityPolicy: false });
  await setupSwagger(app);
  await setupAuth(app);

  // Database
  await connectDB(app);

  // Error handler
  app.setErrorHandler(errorHandler);

  // Routes
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(taskRoutes, { prefix: "/api/tasks" });

  // Health check
  app.get("/health", async () => ({ status: "ok" }));

  // Start
  const port = env.PORT || 3000;
  await app.listen({ port, host: "0.0.0.0" });
  app.log.info(`Worker ${process.pid} listening on port ${port}`);

  // Graceful shutdown
  const signals = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      app.log.info(`Received ${signal}, shutting down...`);
      await app.close();
      process.exit(0);
    });
  });

  return app;
}

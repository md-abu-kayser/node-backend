import cluster from "node:cluster";
import os from "node:os";
import { startServer } from "./server";

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running, forking ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, starting new one`);
    cluster.fork();
  });
} else {
  startServer().catch((err) => {
    console.error("Server startup failed:", err);
    process.exit(1);
  });
}

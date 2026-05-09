# Node Backend

<!-- MIT License -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

<!-- Infra & Runtime -->

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

<!-- Databases -->

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A production-ready, TypeScript-powered Node.js backend built with Fastify, JWT authentication, MongoDB, Swagger API docs, and clustered worker support.

## 🚀 Overview

This repository implements a secure task management API with:

- Fastify for high-performance HTTP handling
- MongoDB via Mongoose for data persistence
- JWT-based authentication and role-aware access control
- OpenAPI documentation through Swagger UI
- Centralized error handling and environment-based logging
- Docker Compose support for local development and deployment

## 🔧 Key Features

- **Auth system**: user signup and login with email/password
- **Protected task CRUD**: create, read, update, delete tasks for authenticated users
- **Admin support**: admin users can access all tasks
- **Input validation**: schema validation with Zod
- **Security middleware**: Helmet, CORS, bcrypt password hashing
- **Swagger docs**: interactive API documentation at `/docs`
- **Cluster-ready**: multi-process server startup for CPU scalability

## 🧩 Architecture

The codebase is organized into clear modules:

- `src/server.ts` — application bootstrapping and route registration
- `src/index.ts` — cluster manager for worker processes
- `src/config/env.ts` — environment configuration
- `src/plugins/` — shared Fastify plugins for Swagger, auth, and DB
- `src/modules/auth/` — auth routes, controllers, services, and validation
- `src/modules/task/` — task routes, controllers, services, models, and validation
- `src/middlewares/` — authentication and authorization hooks
- `src/utils/` — shared utilities for hashing, JWT, and error handling

## 📦 Tech Stack

- Node.js 20+
- TypeScript 6
- Fastify 5
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Swagger / OpenAPI
- Docker & Docker Compose
- Vitest + Supertest for API testing

## ⚙️ Installation

```bash
git clone https://github.com/md-abu-kayser/node-backend.git
cd node-backend
npm install
```

### Environment variables

Create a `.env` file in the project root or provide environment variables through your deployment platform.

```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=replace-with-your-secret
JWT_EXPIRES_IN=7d
```

## ▶️ Run Locally

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

The app listens on `http://localhost:3000` by default.

## 🧪 Testing

This project includes Fastify integration tests.

```bash
npm run tests
```

## 📚 API Endpoints

### Public

- `POST /api/auth/signup` — register a new user
- `POST /api/auth/login` — authenticate and return a JWT
- `GET /health` — health check endpoint
- `GET /docs` — Swagger UI documentation

### Protected (JWT required)

All `/api/tasks` routes require a bearer token in the `Authorization` header.

- `POST /api/tasks` — create a new task
- `GET /api/tasks` — list tasks
- `GET /api/tasks/:id` — get a specific task
- `PUT /api/tasks/:i d` — update a task
- `DELETE /api/tasks/:id` — delete a task

## 🛡️ Authentication & Authorization

- Passwords are securely hashed with `bcrypt`
- Tokens use `jsonwebtoken` and are signed with `JWT_SECRET`
- `authenticate` middleware validates JWTs for protected routes
- `authorize` middleware can enforce role-based access control
- Admin users can retrieve all tasks, while regular users only see their own tasks

## 🐳 Docker Support

### Build and run with Docker

```bash
docker-compose up --build
```

This starts:

- `app` on port `3000`
- `mongo` on port `27017`

### Container image

```bash
docker build -t node-backend .
```

## 🔧 Production Readiness

This backend is designed for production with:

- clustered worker processes via Node.js `cluster`
- secure HTTP headers via `@fastify/helmet`
- structured logging with `pino`
- centralized error handling and validation responses
- Dockerized deployment path

## 📘 Notes

- Default environment values are provided, but always override `JWT_SECRET` in production.
- Swagger docs are available under `/docs` when the server runs.
- The MongoDB connection uses `MONGO_URI` and exits cleanly on failure.

## 📁 Project Structure

```
src/
  index.ts
  server.ts
  config/
    env.ts
  plugins/
    auth.ts
    db.ts
    swagger.ts
  middlewares/
    authenticate.ts
    authorize.ts
  modules/
    auth/
      auth.controller.ts
      auth.route.ts
      auth.schema.ts
      auth.service.ts
    task/
      task.controller.ts
      task.model.ts
      task.route.ts
      task.schema.ts
      task.service.ts
  utils/
    errors.ts
    hash.ts
    jwt.ts
```

### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

### Contact and Maintainer

- **Name:** Md Abu Kayser
- **Project:** _node-backend_
- **Maintainer:** [md-abu-kayser](https://github.com/md-abu-kayser)
- **Email:** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)
- **GitHub:** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)

If you’d like this README tailored for a specific purpose - such as **hiring managers**, **open-source contributors**, or **client deliverables** - feel free to request a custom tone or format.

---

import { buildApp } from "../src/server";
import supertest from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("Auth routes", () => {
  let app: any;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /api/auth/signup creates user", async () => {
    const res = await app.inject().post("/api/auth/signup").body({
      email: "test@test.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
    expect(res.json().token).toBeDefined();
  });
});

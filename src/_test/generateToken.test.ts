import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";
import User from "../models/User";

jest.mock("../models/User");

describe("generateToken Controller", () => {
  const validEmail = "test@example.com";
  const invalidEmail = "invalidemail";

  beforeAll(() => {
    process.env.SECRET_KEY = "test";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if no email is provided", async () => {
    const res = await request(app).post("/api/token").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please type your email");
  });

  it("should return 400 if email format is invalid", async () => {
    const res = await request(app)
      .post("/api/token")
      .send({ email: invalidEmail });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Invalid email format, please check your email"
    );
  });

  it("should create a new user and return a token for a valid email", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.prototype.save as jest.Mock).mockResolvedValue({});

    const res = await request(app)
      .post("/api/token")
      .send({ email: validEmail });

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(validEmail);
    expect(jwt.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy();
  });

  it("should return a token for an existing user", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ email: validEmail });

    const res = await request(app)
      .post("/api/token")
      .send({ email: validEmail });

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(validEmail);
    expect(jwt.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy();
  });
});

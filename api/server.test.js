// Write your tests here
const request = require("supertest");
const server = require("./server");

describe("[POST] /register", () => {
  test("error when no username or password", async () => {
    const resU = await request(server).post("/api/auth/register").send({
      username: "",
      password: "password",
    });
    const resP = await request(server).post("/api/auth/register").send({
      username: "uername",
      password: "",
    });
    expect(resU.body).toMatchObject({
      message: "username and password required",
    });
    expect(resP.body).toMatchObject({
      message: "username and password required",
    });
  });
});

describe("[POST] /login", () => {
  test("error when no username or password", async () => {
    const resU = await request(server).post("/api/auth/register").send({
      username: "",
      password: "password",
    });
    const resP = await request(server).post("/api/auth/register").send({
      username: "uername",
      password: "",
    });
    expect(resU.body).toMatchObject({
      message: "username and password required",
    });
    expect(resP.body).toMatchObject({
      message: "username and password required",
    });
  });
});

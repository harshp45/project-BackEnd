
const request = require("supertest");

const app = require("../app");



beforeAll(async () => {
      console.log("Menu Test Started!!");
  })

//Fetching stored menu items from the DB with login token
describe("GET /api/menu/list", () => {
    test("It responds with an array of menus", async () => {
      const response = await request(app)
      .get("/api/menu/list")
      .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGF2aWQ1NkBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJEYXZpZCIsImFkZHJlc3MiOiJOb3J0aCBZb3JrIiwidHlwZSI6ImN1c3RvbWVyIn0sImlhdCI6MTYxODE5NjIxOSwiZXhwIjoxNjE4MjI2MjE5fQ.z5uqLdSxppe5VVE1hsrANZGWuv6Hk9ODmAXShQEt_VY");
      expect(response.body.length).toBe(4);
      expect(response.body[0]).toHaveProperty("_id");
      expect(response.body[0]).toHaveProperty("itemname");
      expect(response.body[0]).toHaveProperty("image");
      expect(response.body[0]).toHaveProperty("location");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("sellername");
      expect(response.body[0]).toHaveProperty("category");
      expect(response.statusCode).toBe(200);
    });
  });

  //Fetching stored menu items from the DB with login token
  describe("GET /api/menu/list", () => {
    test("User needs to login to fetch the menus!!!", async () => {
      const response = await request(app).get("/api/menu/list");
      //Without Token added into header
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe("no token authorization denied");
    });
  });

  afterAll(() => console.log("Menu Test Completed!!"));

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
      .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmlrczAwN0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJOaXJtaXQiLCJhZGRyZXNzIjoiVG9yb250byIsInR5cGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2MTkxNjA3MzksImV4cCI6MTYxOTE5MDczOX0.hZ1hkOqg6aGxmnIy-tdwXHC650TEVyvGEY-uC_nmlY8");
      expect(response.body.length).toBe(4);
      expect(response.body[0]).toHaveProperty("_id");
      expect(response.body[0]).toHaveProperty("itemname");
      expect(response.body[0]).toHaveProperty("image");
      expect(response.body[0]).toHaveProperty("location");
      expect(response.body[0]).toHaveProperty("price");
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
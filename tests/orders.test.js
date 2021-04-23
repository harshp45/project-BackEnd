
const request = require("supertest");

const app = require("../app");

beforeAll(async () => {
  console.log("Orders Test Started!!");
  });


//Fetching stored orders from the DB with login token
describe("GET /api/order/list", () => {
    test("It responds with an array of orders", async () => {
      const response = await request(app)
      .get("/api/order/list")
      .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmlrczAwN0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJOaXJtaXQiLCJhZGRyZXNzIjoiVG9yb250byIsInR5cGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2MTkxMTg0NzksImV4cCI6MTYxOTE0ODQ3OX0.zSQ80DT6ynKM9gyXhqi1qg4R8xy7rWCgYjfm9gS-EPw");
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toHaveProperty("_id");
      expect(response.body[0]).toHaveProperty("items");
      expect(response.body[0]).toHaveProperty("customer");
      expect(response.body[0]).toHaveProperty("customeremail");
      expect(response.body[0]).toHaveProperty("customerAddress");
      expect(response.body[0]).toHaveProperty("sellerlocation");
      expect(response.body[0]).toHaveProperty("totalprice");
      expect(response.statusCode).toBe(200);
    });
  });

  //Fetching stored orders from the DB without login token
  describe("GET /api/order/list", () => {
    test("User needs to login to fetch the orders!!!", async () => {
      const response = await request(app).get("/api/order/list");
      //Without Token added into header
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe("no token authorization denied");
    });
  });

  describe("POST /api/order/add", () => {
    test("Adding orders into DB with token", async () => {
      const response = await request(app)
      .post("/api/order/add")
      .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmlrczAwN0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJOaXJtaXQiLCJhZGRyZXNzIjoiVG9yb250byIsInR5cGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2MTkxMTg0NzksImV4cCI6MTYxOTE0ODQ3OX0.zSQ80DT6ynKM9gyXhqi1qg4R8xy7rWCgYjfm9gS-EPw")
      .send({
        customer: "David",
        customeremail:"david56@gmail.com",
        customerAddress: "Toronto",
        items: ["Punjabi","Noodles"],
        sellerlocation:"Etobicoke",
        totalprice: 32
      });
      expect(response.statusCode).toBe(200);
    });
  });


  describe("POST /api/order/add", () => {
    test("User needs to login to add the orders data to DB", async () => {
        const response = await request(app)
        .post("/api/order/add")
        .send({
          customer: "Priyanka",
          seller: "raj",
          customerAddress: "Toronto",
          items: ["Punjabi","Noodles"],
          itemquantity:[2,4],
          totalprice: 38
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe("no token authorization denied");
    });
  });

  afterAll(() => console.log("Order Test Completed!!"));
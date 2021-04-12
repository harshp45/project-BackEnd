
const request = require("supertest");

const app = require("../app");

beforeAll(async () => {
    
  });


describe("POST /api/order/add", () => {
    test("Adding orders into DB with token", async () => {
      const response = await request(app)
      .post("/api/order/add")
      .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicmFqMjFAbXlzZW5lY2EuY2EiLCJmaXJzdG5hbWUiOiJSYWoiLCJhZGRyZXNzIjoiVG9yb250byIsInR5cGUiOiJzZWxsZXIifSwiaWF0IjoxNjE3ODI1MTA5LCJleHAiOjE2MTc4NTUxMDl9.gOoBP0TBj_LDSVUJyKmzGpQC95_KxEwKHif5moOHSkk")
      .send({
        customer: "Prima",
        seller: "raj",
        customerAddress: "Toronto",
        items: ["Masala Dosa","Noodles"],
        itemquantity:[2,4],
        totalprice: 42
      });
      expect(response.statusCode).toBe(200);
    });
  });


  describe("POST /api/order/add", () => {
    test("User needs to login to add the orders data to DB", async () => {
        const response = await request(app)
        .post("/api/order/add")
        .send({
          customer: "Prima",
          seller: "raj",
          customerAddress: "Toronto",
          items: ["Masala Dosa","Noodles"],
          itemquantity:[2,4],
          totalprice: 42
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe("no token authorization denied");
    });
  });

  afterAll(() => {});
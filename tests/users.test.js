
const request = require("supertest");

const app = require("../app");

beforeAll(async () => {
    
  });


describe("POST /api/order/add", () => {
    test("User Registration.", async () => {
        const response = await request(app)
        .post("/api/user/add")
        .send({
            firstname: "Priyanka",
            lastname:"Shah",
            address:"Toronto",
            phone:6475329846,
            email:"priyankashah69@gmail.com",
            password:"Priyanka@123",
            type:"customer"
        });
        expect(response.statusCode).toBe(200);
    });
  });


  describe("POST /api/order/login", () => {
    test("User login", async () => {
        const response = await request(app)
        .post("/api/user/login")
        .send({
            email:"kevalshah69@gmail.com",
            password:"Keval@123",
        });
        expect(response.statusCode).toBe(200);
    });
  });

  afterAll(() => {});
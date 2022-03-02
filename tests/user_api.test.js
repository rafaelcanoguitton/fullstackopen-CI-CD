const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const userHelper=require("./user_helper");
beforeEach(async()=>{
    await User.deleteMany({});
    await User.insertMany(userHelper.initialUsers);
},10000);
describe("User creation", () => {
  test("invalid user returns correct status code and does not get created", async() => {
      await api.post('/api/users').send(userHelper.invalidPassword).expect(400);
      await api.post('/api/users').send(userHelper.invalidUser).expect(400);
      await api.post('/api/users').send(userHelper.invalidUserName).expect(400);
      const result=await api.get('/api/users');
      expect(result.body).toHaveLength(userHelper.initialUsers.length);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
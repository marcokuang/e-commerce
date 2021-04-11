import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

// declare a global signin function
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

//start a mongo DB instance in memory
let mongo: any;
// hook function: beforeAll() will be executed before all test suites start
beforeAll(async () => {
  // set the JWT_KEY environment variable with Jest
  process.env.JWT_KEY = "MY_TOP_SECRET";

  // start mongoDB
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

// beforeEach() will be executed before each test starts
beforeEach(async () => {
  // reset all the data in the Mongo DB
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// clean up function, will be executed after the tests finish.
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@gmail.com",
      password: "1234",
    })
    .expect(201);

  return authResponse.get("Set-Cookie");
};

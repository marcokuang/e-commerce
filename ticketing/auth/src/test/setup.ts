import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

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

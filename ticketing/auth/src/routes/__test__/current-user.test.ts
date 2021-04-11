import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  // const authResponse = await request(app)
  //   .post("/api/users/signup")
  //   .send({
  //     email: "email@gmail.com",
  //     password: "1234",
  //   })
  //   .expect(201);

  // extract the cookie from the signup request
  const cookie = await global.signin();
  const response = await request(app)
    .get("/api/users/currentuser")
    // attach the cookie to the second request
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("email@gmail.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});

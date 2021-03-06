import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
// Make sure Express is aware it's behind a proxy of ingress nginX, and trust the traffic is secured.
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    // signed is to encrypt the cookie; since JWT is tampering-safe, we will save as is.
    signed: false,
    // secure makes sure the cookie is sent over HTTPS
    secure: true,
  })
);

// import the custom router object as a middleware.
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

// set up mongoDB connection with mongoose
const start = async () => {
  // check if the secret key JWT_KEY is defined or not
  if (!process.env.JWT_KEY) {
    throw new Error("ENV VAR JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongoDB");
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log("Version 1:  Listening on port 3000!!");
  });
};

start();

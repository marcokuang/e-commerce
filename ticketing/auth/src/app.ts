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
    secure: process.env.NODE_ENV !== "test",
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

// export the app
export { app };

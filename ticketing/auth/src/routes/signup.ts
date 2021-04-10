import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { DatabaseConnectionError } from "../errors/database-connection-errors";

import { User } from "../models/users";

const router = express.Router();
router.post(
  "/api/users/signup",
  // use `body` from express-validator as a middleware before calling the request handler
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    // validationRequest function is called inside the request handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // set the error status to 400, and send an array of errors back to client as JSON data

      // return res.status(400).send(errors.array());

      // throw new Error("Invalid email or password");
      throw new RequestValidationError(errors.array());
    }
    // validate the email and password -- now use a libaray to provide the functionality
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log("Email in Use");
      throw new BadRequestError("Email in Use");
    }

    const user = User.build({ email, password });
    // save user to DB
    await user.save();

    // Generate JWT, which includes the user ID, and email
    const userJwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    // the Cookie-session library will take this req.session object, serialize it, and send back to user's browser
    req.session = { jwt: userJwtToken };

    res.status(201).send(user);
  }
);

// use the 'as' keyword to rename the export object
export { router as signupRouter };

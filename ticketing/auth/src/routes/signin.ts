import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/users";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email mst be valid"),
    body("password").trim().notEmpty().withMessage("You must give a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // NOTE: the error handling logic is extracted to validateRequest middleware
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   throw new RequestValidationError(errors.array());
    // }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.error("No user found");

      throw new BadRequestError("Invalid credientials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      console.error(password, "Password not matched");

      throw new BadRequestError("Invalid credientials");
    }

    // Generate JWT, which includes the user ID, and email
    const userJwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    // the Cookie-session library will take this req.session object, serialize it, and send back to user's browser
    req.session = { jwt: userJwtToken };

    res.status(201).send(existingUser);
  }
);

// use the 'as' keyword to rename the export object
export { router as signinRouter };

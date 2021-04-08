import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-errors";

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
  (req: Request, res: Response) => {
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

    console.log("Creating a user now.");
    throw new DatabaseConnectionError();
    res.send({ message: "Created a user" });
  }
);

// use the 'as' keyword to rename the export object
export { router as signupRouter };

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email mst be valid"),
    body("password").trim().notEmpty().withMessage("You must give a password"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    // NOTE: the error handling logic is extracted to validateRequest middleware
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   throw new RequestValidationError(errors.array());
    // }
    res.send("Hi there!");
  }
);

// use the 'as' keyword to rename the export object
export { router as signinRouter };

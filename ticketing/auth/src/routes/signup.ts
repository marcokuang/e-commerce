import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    // validate the email and password -- now use a libaray to provide the functionality
    const { email, password } = req.body;

    res.send("Hi there!");
  }
);

// use the 'as' keyword to rename the export object
export { router as signupRouter };

import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();
router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    // if (!req.currentUser) {
    //   return res.send({ currentUser: null });
    // }

    // res.send({currentUser: req.currentUser});
    res.send({ currentUser: req.currentUser || null });
  }
);

// use the 'as' keyword to rename the export object
export { router as currentUserRouter };

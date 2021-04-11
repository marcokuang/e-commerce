import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Define the payload data structure in the JWT payload section
 */
interface UserPayload {
  id: string;
  email: string;
}

/**
 * Augment/update the existing Request type by using a declare block.
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * This middleware is going to check if the user is logged in. If user is logged in, it will extract the JWT
 * payload from the request object, and set it on req.currentUser for the next middleware or handler to consume.
 * @param req request
 * @param res response
 * @param next next function
 */
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the session object doesn't have jwt property, user is not authenticated.
  if (!req.session?.jwt) {
    // return res.send({ currentUser: null });
    return next();
  }

  // Decode the JWT token
  try {
    // verify() will throw an error if the token is modified.
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
    // res.send({ currentUser: payload });
  } catch (e) {}

  next();
};

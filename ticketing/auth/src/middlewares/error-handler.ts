import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { DatabaseConnectionError } from "../errors/database-connection-errors";

/**
 *
 * @param err - Error Object
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Next function handler
 * @returns - array of Error objects
 *
 * Error object from the response structure
 * {
 *  errors: {
 *    message: string, field?: string
 *  }[]
 * }
 */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    // console.log("Handling this error as a request validation error");
  }

  // returns a generic error message
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};

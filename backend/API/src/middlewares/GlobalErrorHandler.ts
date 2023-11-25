import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Request, Response } from "express";
import { Service } from "typedi";
import { ResponseSchema } from "routing-controllers-openapi";
import { ValidationError } from "class-validator";
import { GlobalErrorClass } from "../common/errors/ErrorClass";

@Service()
@Middleware({ type: "after" })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  @ResponseSchema(Error)
  error(
    error: GlobalErrorClass,
    _request: Request,
    response: Response,
    next: (err: any) => any
  ) {
    console.log("GlobalErrorHandler catched an error:");
    if (error) {
      console.error(error);

      if (error.httpCode && error.httpCode === 400) {
        if (error.errors && error.errors[0] instanceof ValidationError) {
          response.status(400).send({
            code: "VALIDATION_ERROR",
            message: error,
          });
          return;
        }
        response.status(400).send({
          code: "BAD_REQUEST",
          message: error,
        });
        return;
      }

      response.status(500).send({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
      return;
    }
    next(null);
  }
}

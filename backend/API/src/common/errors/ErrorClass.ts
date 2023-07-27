import { ResponseTypes } from "../types/ResponseTypes";

export class ErrorClass {
  code: ResponseTypes;
  message: string;
  constructor(code: ResponseTypes, message: string) {
    this.code = code;
    this.message = message;
  }
}

export class GlobalErrorClass extends Error {
  code: ResponseTypes;
  message: string;
  httpCode?: number;
  errors?: [Object];
}

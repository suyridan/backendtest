import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  // checkCustomerRole(req: Request, res: Response, next: NextFunction) {
  //   const user = req.user as UserEntity;
  //   if (user.role !== RoleType.CUSTOMER) {
  //     return this.httpResponse.Unauthorized(res, "No tienes permiso");
  //   }
  //   return next();
  // }
  // checkAdminRole(req: Request, res: Response, next: NextFunction) {
  //   const user = req.user as UserEntity;
  //   if (user.role !== RoleType.ADMIN) {
  //     return this.httpResponse.Unauthorized(res, "No tienes permiso");
  //   }
  //   return next();
  // }
}

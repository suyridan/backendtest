import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../../config/AppDataSource";
import { User } from "../entities/User.entity";

export const authorization = (roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req["currentUser"].id },
    });
    if(user){
        console.log(user);
        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: "Forbidden" });
        }
    }
    next();
  };
};
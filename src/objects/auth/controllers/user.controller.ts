import { Request, Response } from "express";
import { encrypt } from "../../../helpers/helpers";
import * as cache from "memory-cache";
import { AppDataSource } from "../../../config/AppDataSource";
import { User } from "../entities/User.entity";

export class UserController {
  static async signup(req: Request, res: Response) {
    console.log('body', req.body)
    const { username, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    const token = encrypt.generateToken({ id: user.id });
    return res
      .status(200)
      .json({ message: "Usuario creado correctamente", token, user });
  }
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    if(user){
        user.username = name;
        user.email = email;
        await userRepository.save(user);
    }
    res.status(200).json({ message: "update", user });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    if(user){
        await userRepository.remove(user);
    }
    res.status(200).json({ message: "ok" });
  }
}
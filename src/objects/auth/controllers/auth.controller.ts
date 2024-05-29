import { Request, Response } from "express";
import { encrypt } from "../../../helpers/helpers";
import { AppDataSource } from "../../../config/AppDataSource";
import { User } from "../entities/User.entity";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(500)
          .json({ message: "nombre de usuario y contraseña requerido" });
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { username } });

      let token = ''
      if(user){
          const isPasswordValid = encrypt.comparepassword(user.password, password);
          if (!user || !isPasswordValid) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          }
          token = encrypt.generateToken({ id: user.id });
      }

      return res.status(200).json({ message: "Logeo exitoso", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: any, res: Response) {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req["currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}
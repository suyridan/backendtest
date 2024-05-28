import { Request, Response } from "express"; 
import AppDataSource from "../../../config/data.source";

export class AccountController {
  static async getResult(req: Request, res: Response) {
    try {

      let data = await AppDataSource.manager.query(`SELECT * FROM public.get_active_loans('2021-05-21',360)`);
      if (!data) {
        return res
          .status(500)
          .json({ message: "nombre de usuario y contraseña requerido" });
      }
      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

}

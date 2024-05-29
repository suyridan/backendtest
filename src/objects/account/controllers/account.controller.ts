import { Request, Response } from "express"; 
import { AppDataSource } from "../../../config/AppDataSource";

export class AccountController {
  static async getResult(req: Request, res: Response) {
    try {
      const { fecha_actual, tasa_interes, dias_anio_comercial } = req.body
      let data = await AppDataSource
        .manager
        .query('SELECT * FROM execute_and_get_payments( $1 , $2 , $3 )', [fecha_actual, tasa_interes, dias_anio_comercial]);

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

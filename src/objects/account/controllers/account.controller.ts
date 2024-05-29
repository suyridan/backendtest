import { Request, Response } from "express";
import { AppDataSource } from "../../../config/AppDataSource";

interface CuentaType {
  cliente: string
  monto: number
}

export class AccountController {
  static async getResult(req: Request, res: Response) {
    try {
      const { fecha_actual, tasa_interes, dias_anio_comercial } = req.body
      /** Excecute query with parameters from body  */
      let payments = await AppDataSource
        .manager
        .query('SELECT * FROM execute_and_get_payments( $1 , $2 , $3 )', [fecha_actual, tasa_interes, dias_anio_comercial]);

      let accounts: CuentaType[] = []
      /** loop to get accounts   */
      await payments.forEach((payment: CuentaType) => {
        let account: CuentaType = {
          cliente: payment.cliente,
          monto: payment.monto
        }
        let needsAddToArray = true
        accounts.forEach(updateCuenta => {
          needsAddToArray = false
          /** updates amount of current account*/
          updateCuenta.monto = account.monto
        })
        if (needsAddToArray) {
          accounts.push(account)
        }
      });

      let data: any = {
        pagos: payments,
        cuentas: accounts
      }
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
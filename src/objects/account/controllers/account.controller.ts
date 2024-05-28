import { Request, Response } from "express"; 
import { HttpResponse } from "../../../shared/response/http.response";
import AppDataSource from "../../../config/data.source";

export class AccountController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getResult(req: Request, res: Response) {
    try {
      // const data = await this.auditService.getAuditoriasp(req.params.data);

      // const execRepository = await AppDataSource.manager

      let data = 'hola mundo';
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

}

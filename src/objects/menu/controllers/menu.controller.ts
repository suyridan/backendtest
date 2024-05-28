import { Request, Response } from "express"; 
import AppDataSource from "../../../config/data.source";
import { MenuItem } from "../entities/menu.entity";

export class MenuController {
  static async getResult(req: Request, res: Response) {
    try {

      const data = await AppDataSource.manager.getRepository(MenuItem).find()

      const newData = getChildren(data)

      if (!newData) {
        return res
          .status(500)
          .json({ message: "nombre de usuario y contraseña requerido" });
      }
      return res.status(200).json(newData);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  
}

function getChildren(arr: MenuItem[], parent?: number) {
  var out = []
  for(var i in arr) {
      if(arr[i].parent_id == parent) {
          var children = getChildren(arr, arr[i].id)

          if(children.length) {
              arr[i].children = children
          }
          out.push(arr[i])
      }
  }
  return out
}

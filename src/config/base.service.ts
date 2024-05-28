import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
  constructor(public getEntity: EntityTarget<T>) {
    super();
    this.getConn = null
  }

  public getConn: DataSource | null;
  
  async closeRepository(){
    if(this.getConn){
      return this.getConn.destroy()
    }
  }
}

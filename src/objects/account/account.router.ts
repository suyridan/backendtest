import { BaseRouter } from "../../shared/router/router";
import { AccountController } from "./controllers/account.controller";
import { AccountMiddleware } from "./middlewares/account.middleware";
export class AccountRouter extends BaseRouter<AccountController, AccountMiddleware> {
  constructor() {
    super(AccountController, AccountMiddleware);
  }

  routes(): void {
    this.router.get("/", (req, res) =>
      this.controller.getResult(req, res)
    );
  }
}

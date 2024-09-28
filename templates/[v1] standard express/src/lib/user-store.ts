import { JwtPayload } from "jsonwebtoken";

type user_id = string | JwtPayload | null;

export default class UserStore {
  private user_id: user_id = "";

  public set(id: user_id): void {
    this.user_id = id;
  }

  public get(): user_id {
    return this.user_id;
  }

  public show() {
    console.log(this.user_id);
  }
}

import { decodeJwt, verifyToken } from "@/lib/auth.utils";
import { HTTP_STATUS } from "@/lib/http";
import UserStore from "@/lib/user-store";
import { Response, Request, NextFunction } from "express";

const authFn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization" || "Authorization"];
  if (!token) {
    console.log("No token in headers: @Middleware/authFn");
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "No Access Token Found" });
  }

  const access_token = token.split(" ")[1];
  const _jwtTemp = verifyToken(req, res, access_token);

  if (!_jwtTemp) {
    console.log("Invalid Access Token: @Middleware/authFn");
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Invalid Access Token Found" });
  }

  new UserStore().set(decodeJwt(_jwtTemp as string));

  return next();
};

export default authFn;

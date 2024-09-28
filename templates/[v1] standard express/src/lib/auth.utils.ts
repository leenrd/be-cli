import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "./env";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 7);
};

export const comparePassword = async (
  password: string,
  hashedFromDb: string
) => {
  return bcrypt.compare(password, hashedFromDb);
};

type User = {
  id?: string;
};

export const getToken = (user_id: User | any) => {
  return jwt.sign(
    {
      id: user_id,
    },
    JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export const bakeCookie = (res: Response, token: string) => {
  return res.cookie("access_token", token, {
    httpOnly: true,
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  access_token: string
) => {
  return jwt.verify(access_token, JWT_SECRET as string);
};

export const decodeJwt = (token: string) => {
  return jwt.decode(token);
};

import {
  bakeCookie,
  comparePassword,
  getToken,
  hashPassword,
} from "@/lib/auth.utils";
import { HTTP_STATUS } from "@/lib/http";
import UserModel from "@/models/user.model";
import { auth_dto, auth_schema } from "@/types/auth";
import { Request, Response } from "express";
import { ZodError } from "zod";

const signup_controller = async (
  req: Request<{}, any, auth_dto>,
  res: Response
): Promise<any> => {
  try {
    const _temp = auth_schema.parse(req.body);
    const { email, password } = _temp;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    const new_user = await UserModel.create({
      email,
      password: await hashPassword(password),
    });

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: "User created", new_user });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("ZodError: @signup_controller", error.errors);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Wrong credentials" });
    }

    console.error("Error: @signup_controller", error);
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Error signing up User" });
  }
};

const login_controller = async (
  req: Request<{}, {}, auth_dto>,
  res: Response
): Promise<any> => {
  try {
    const _temp = auth_schema.parse(req.body);
    const { email, password } = _temp;

    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "User doesn't exists" });
    }

    const isMatch = comparePassword(password, userExists.password);
    if (!isMatch) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Wrong password" });
    }

    const access_token = getToken(userExists.id);
    bakeCookie(res, access_token);

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Successfully logged in" });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("ZodError: @login_controller", error.errors);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Wrong credentials" });
    }

    console.error("Error: @login_controller", error);
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Error logging in User" });
  }
};

const logout_controller = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("access_token");
    return res.status(HTTP_STATUS.OK).json({ message: "Logged out" });
  } catch (error) {
    console.error("Error: @logout_controller", error);
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Error logging out User" });
  }
};

export { signup_controller, login_controller, logout_controller };

import { HTTP_STATUS } from '@/lib/http';
import UserModel from '@/models/user.model';
import { Response, Request } from 'express';

const user_controller = async (req: Request, res: Response): Promise<any> => {
  try {
    const user_id = req.user_id;
    if (!user_id) {
      console.log('No token in @User-Store class');
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Token doesn't exists" });
    }

    const user = await UserModel.findById(user_id);
    if (!user) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "User doesn't exists" });
    }

    return res.status(HTTP_STATUS.OK).send(user);
  } catch (error) {
    console.error('Error: @user_controller', error);
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Error signing up User' });
  }
};

const updateUser_controller = async (
  req: Request,
  res: Response
): Promise<any> => {};

const deleteUser_controller = async (
  req: Request,
  res: Response
): Promise<any> => {};

export default user_controller;

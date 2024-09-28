import { Router } from "express";
import {
  signup_controller,
  login_controller,
  logout_controller,
} from "@/controllers/auth.controller";

const router = Router();

router.route("/signup").post(signup_controller);
router.route("/login").post(login_controller);
router.route("/logout").post(logout_controller);

export default router;

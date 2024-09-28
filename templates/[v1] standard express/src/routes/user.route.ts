import user_controller from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();
router.route("/").get(user_controller);

export default router;

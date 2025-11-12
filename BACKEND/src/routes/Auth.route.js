import express from "express";
import { register_user, Login_user } from "../controllers/Auth.controller.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register_user);
router.post("/login", Login_user);

router.get("/me", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

export default router;

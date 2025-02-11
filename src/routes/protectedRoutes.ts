import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: (req as any).user });
});

export default router;

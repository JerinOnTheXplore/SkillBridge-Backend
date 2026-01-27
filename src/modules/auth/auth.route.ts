import express, { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

//jekono logged in user..
router.get("/me", authMiddleware, AuthController.me);

// role protected route hishebe kaj kore..
router.get(
  "/admin-check",
  authMiddleware,//ekhane roleMiddleware age dibona,,eta korar por token verify korar agei req.user.role check korse...tai Cannot read properties of undefined (reading 'role') ashchilo ..
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.json({ message: "Admin access granted .." });
  }
);

export const authRoutes = router;
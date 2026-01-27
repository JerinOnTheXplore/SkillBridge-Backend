import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

const register = async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result.user,
    token: result.token, 
  });
};

const login = async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result.user,
    token: result.token, 
  });
};

const me = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user = await AuthService.getMe(req.user.userId);

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const AuthController = {
  register,
  login,
  me,
};

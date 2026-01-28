import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware =async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
console.log("Token from header:", token);


    const decoded:any = verifyToken(token);
    console.log("Decoded JWT:", decoded);
    // user fetch
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ message: "User not found" });

    let tutorProfileId: string | undefined;

    if (user.role === "TUTOR") {
      const profile = await prisma.tutorProfile.findUnique({ where: { userId: user.id } });
      if (!profile) return res.status(403).json({ message: "Tutor profile not found" });
      tutorProfileId = profile.id;
    }

    req.user = {
      userId: user.id,
      role: user.role,
      tutorProfileId, 
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

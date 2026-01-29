import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const listUsers = async (req: Request, res: Response) => {
  const users = await AdminService.listUsers();

  res.json({
    success: true,
    data: users,
  });
};

const banUser = async (req: Request, res: Response) => {
  const user = await AdminService.banUser(req.params.id as string);

  res.json({
    success: true,
    message: "User banned",
    data: user,
  });
};

const unbanUser = async (req: Request, res: Response) => {
  const user = await AdminService.unbanUser(req.params.id as string);

  res.json({
    success: true,
    message: "User unbanned",
    data: user,
  });
};

const listBookings = async (req: Request, res: Response) => {
  const bookings = await AdminService.listBookings();

  res.json({
    success: true,
    data: bookings,
  });
};

const dashboard = async (req: Request, res: Response) => {
  try {
    const stats = await AdminService.getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to load admin dashboard stats",
    });
  }
};


export const AdminController = {
  listUsers,
  banUser,
  unbanUser,
  listBookings,
  dashboard,
};

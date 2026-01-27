import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

import { Role } from "../../../generated/prisma/enums";
import { generateToken } from "../../utils/jwt";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const register = async (payload: RegisterPayload) => {
  if (payload.role === "ADMIN") {
    throw new Error("Admin registration is not allowed");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    },
  });

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    },
    token,
  };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.status === "BANNED") {
    throw new Error("User is banned");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  };
};

const getMe = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

export const AuthService = {
  register,
  login,
  getMe,
};

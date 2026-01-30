var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.3.0",
      "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
      "activeProvider": "postgresql",
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n// ENUMS\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nenum BookingStatus {\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\n// USER\n\nmodel User {\n  id       String     @id @default(uuid())\n  name     String\n  email    String     @unique\n  password String\n  role     Role\n  status   UserStatus @default(ACTIVE)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  tutorProfile TutorProfile?\n  bookings     Booking[]     @relation("StudentBookings")\n  reviews      Review[]\n\n  @@map("users")\n}\n\n// TUTOR PROFILE\n\nmodel TutorProfile {\n  id         String  @id @default(uuid())\n  userId     String  @unique\n  bio        String?\n  hourlyRate Int\n  experience Int // years\n  rating     Float   @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  user         User           @relation(fields: [userId], references: [id])\n  categories   Category[]     @relation("TutorCategories")\n  availability Availability[]\n  bookings     Booking[]\n  reviews      Review[]\n\n  @@map("tutor_profiles")\n}\n\n// CATEGORY\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  createdAt DateTime @default(now())\n\n  // Relations\n  tutors TutorProfile[] @relation("TutorCategories")\n\n  @@map("categories")\n}\n\n// AVAILABILITY\n\nmodel Availability {\n  id        String @id @default(uuid())\n  tutorId   String\n  day       String // e.g. Monday\n  startTime String // "10:00"\n  endTime   String // "12:00"\n\n  tutor TutorProfile @relation(fields: [tutorId], references: [id])\n\n  @@map("availability")\n}\n\n// BOOKINGS\n\nmodel Booking {\n  id        String        @id @default(uuid())\n  studentId String\n  tutorId   String\n  date      DateTime\n  status    BookingStatus @default(CONFIRMED)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  student User         @relation("StudentBookings", fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n  review  Review?\n\n  @@map("bookings")\n}\n\n// REVIEWS\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int // 1\u20135\n  comment String?\n\n  studentId String\n  tutorId   String\n  bookingId String @unique\n\n  createdAt DateTime @default(now())\n\n  // Relations\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n  booking Booking      @relation(fields: [bookingId], references: [id])\n\n  @@map("reviews")\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"users"},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Int"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"TutorCategories"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"}],"dbName":"tutor_profiles"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"TutorCategories"}],"dbName":"categories"},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"day","kind":"scalar","type":"String"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilityToTutorProfile"}],"dbName":"availability"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"}],"dbName":"bookings"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"}],"dbName":"reviews"}},"enums":{},"types":{}}');
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext, NullTypes2, TransactionIsolationLevel, defineExtension;
var init_prismaNamespace = __esm({
  "generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// generated/prisma/enums.ts
var Role, UserStatus, BookingStatus;
var init_enums = __esm({
  "generated/prisma/enums.ts"() {
    "use strict";
    Role = {
      STUDENT: "STUDENT",
      TUTOR: "TUTOR",
      ADMIN: "ADMIN"
    };
    UserStatus = {
      ACTIVE: "ACTIVE",
      BANNED: "BANNED"
    };
    BookingStatus = {
      CONFIRMED: "CONFIRMED",
      COMPLETED: "COMPLETED",
      CANCELLED: "CANCELLED"
    };
  }
});

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";
var PrismaClient;
var init_client = __esm({
  "generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
    PrismaClient = getPrismaClientClass();
  }
});

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    "use strict";
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var generateToken, verifyToken;
var init_jwt = __esm({
  "src/utils/jwt.ts"() {
    "use strict";
    generateToken = (payload) => {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
    };
    verifyToken = (token) => {
      return jwt.verify(token, process.env.JWT_SECRET);
    };
  }
});

// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt";
var register, login, getMe, AuthService;
var init_auth_service = __esm({
  "src/modules/auth/auth.service.ts"() {
    "use strict";
    init_prisma();
    init_jwt();
    register = async (payload) => {
      if (payload.role === "ADMIN") {
        throw new Error("Admin registration is not allowed");
      }
      const existingUser = await prisma.user.findUnique({
        where: { email: payload.email }
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
          role: payload.role
        }
      });
      const token = generateToken({
        userId: user.id,
        role: user.role
      });
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt
        },
        token
      };
    };
    login = async (payload) => {
      const user = await prisma.user.findUnique({
        where: { email: payload.email }
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
        role: user.role
      });
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        },
        token
      };
    };
    getMe = async (userId) => {
      return prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true
        }
      });
    };
    AuthService = {
      register,
      login,
      getMe
    };
  }
});

// src/modules/auth/auth.controller.ts
var register2, login2, me, AuthController;
var init_auth_controller = __esm({
  "src/modules/auth/auth.controller.ts"() {
    "use strict";
    init_auth_service();
    register2 = async (req, res) => {
      const result = await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.user,
        token: result.token
      });
    };
    login2 = async (req, res) => {
      const result = await AuthService.login(req.body);
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result.user,
        token: result.token
      });
    };
    me = async (req, res) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
      }
      const user = await AuthService.getMe(req.user.userId);
      res.status(200).json({
        success: true,
        data: user
      });
    };
    AuthController = {
      register: register2,
      login: login2,
      me
    };
  }
});

// src/middlewares/auth.middleware.ts
var authMiddleware;
var init_auth_middleware = __esm({
  "src/middlewares/auth.middleware.ts"() {
    "use strict";
    init_jwt();
    init_prisma();
    authMiddleware = async (req, res, next) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        console.log("Token from header:", token);
        const decoded = verifyToken(token);
        console.log("Decoded JWT:", decoded);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) return res.status(401).json({ message: "User not found" });
        let tutorProfileId;
        if (user.role === "TUTOR") {
          const profile = await prisma.tutorProfile.findUnique({ where: { userId: user.id } });
          if (!profile) return res.status(403).json({ message: "Tutor profile not found" });
          tutorProfileId = profile.id;
        }
        req.user = {
          userId: user.id,
          role: user.role,
          tutorProfileId
        };
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    };
  }
});

// src/middlewares/role.middleware.ts
var roleMiddleware;
var init_role_middleware = __esm({
  "src/middlewares/role.middleware.ts"() {
    "use strict";
    roleMiddleware = (...roles) => (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  }
});

// src/modules/auth/auth.route.ts
import { Router } from "express";
var router, authRoutes;
var init_auth_route = __esm({
  "src/modules/auth/auth.route.ts"() {
    "use strict";
    init_auth_controller();
    init_auth_middleware();
    init_role_middleware();
    router = Router();
    router.post("/register", AuthController.register);
    router.post("/login", AuthController.login);
    router.get("/me", authMiddleware, AuthController.me);
    router.get(
      "/admin-check",
      authMiddleware,
      //ekhane roleMiddleware age dibona,,eta korar por token verify korar agei req.user.role check korse...tai Cannot read properties of undefined (reading 'role') ashchilo ..
      roleMiddleware("ADMIN"),
      (req, res) => {
        res.json({ message: "Admin access granted .." });
      }
    );
    authRoutes = router;
  }
});

// src/middlewares/errorHandler.ts
var globalErrorHandler;
var init_errorHandler = __esm({
  "src/middlewares/errorHandler.ts"() {
    "use strict";
    globalErrorHandler = (err, req, res, next) => {
      res.status(400).json({
        success: false,
        message: err.message || "Something went wrong"
      });
    };
  }
});

// src/modules/tutor/tutor.service.ts
var searchTutors, getTutorProfile, createOrUpdateProfile, getAllTutors, getTutorById, getTutorDashboard, TutorService;
var init_tutor_service = __esm({
  "src/modules/tutor/tutor.service.ts"() {
    "use strict";
    init_prisma();
    searchTutors = async (query) => {
      const {
        search,
        categoryId,
        minRating,
        minExperience,
        page = "1",
        limit = "10"
      } = query;
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const skip = (pageNum - 1) * limitNum;
      const where = {
        user: {
          status: "ACTIVE",
          role: "TUTOR"
        }
      };
      if (search) {
        where.user.name = {
          contains: search,
          mode: "insensitive"
        };
      }
      if (minRating) {
        where.rating = {
          gte: Number(minRating)
        };
      }
      if (minExperience) {
        where.experience = {
          gte: Number(minExperience)
        };
      }
      if (categoryId) {
        where.categories = {
          some: {
            id: categoryId
          }
        };
      }
      const [data, total] = await Promise.all([
        prisma.tutorProfile.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            categories: true
          },
          skip,
          take: limitNum,
          orderBy: { rating: "desc" }
        }),
        prisma.tutorProfile.count({ where })
      ]);
      return {
        meta: {
          page: pageNum,
          limit: limitNum,
          total
        },
        data
      };
    };
    getTutorProfile = async (userId) => {
      return prisma.tutorProfile.findUnique({
        where: { userId },
        include: { categories: true }
      });
    };
    createOrUpdateProfile = async (userId, payload) => {
      const existing = await prisma.tutorProfile.findUnique({ where: { userId } });
      const data = {};
      if (payload.bio !== void 0) data.bio = payload.bio;
      if (payload.hourlyRate !== void 0) data.hourlyRate = payload.hourlyRate;
      if (payload.experience !== void 0) data.experience = payload.experience;
      if (Array.isArray(payload.categoryIds) && payload.categoryIds.length > 0) {
        const connectData = payload.categoryIds.map((id) => ({ id }));
        if (existing) {
          data.categories = { set: connectData };
        } else {
          data.categories = { connect: connectData };
        }
      }
      if (existing) {
        return prisma.tutorProfile.update({
          where: { userId },
          data,
          include: { categories: true }
        });
      }
      if (payload.hourlyRate === void 0 || payload.experience === void 0) {
        throw new Error("hourlyRate and experience are required for creating profile");
      }
      return prisma.tutorProfile.create({
        data: {
          userId,
          bio: payload.bio || "",
          hourlyRate: payload.hourlyRate,
          experience: payload.experience,
          categories: data.categories
        },
        include: { categories: true }
      });
    };
    getAllTutors = async () => {
      return prisma.tutorProfile.findMany({
        include: { user: true, categories: true }
      });
    };
    getTutorById = async (id) => {
      return prisma.tutorProfile.findUnique({
        where: { id },
        include: { user: true, categories: true }
      });
    };
    getTutorDashboard = async (tutorProfileId) => {
      const now = /* @__PURE__ */ new Date();
      const [
        totalBookings,
        confirmedCount,
        completedCount,
        cancelledCount,
        upcomingSessions,
        recentCompleted,
        reviewStats
      ] = await Promise.all([
        prisma.booking.count({
          where: { tutorId: tutorProfileId }
        }),
        prisma.booking.count({
          where: { tutorId: tutorProfileId, status: "CONFIRMED" }
        }),
        prisma.booking.count({
          where: { tutorId: tutorProfileId, status: "COMPLETED" }
        }),
        prisma.booking.count({
          where: { tutorId: tutorProfileId, status: "CANCELLED" }
        }),
        prisma.booking.findMany({
          where: {
            tutorId: tutorProfileId,
            date: { gte: now },
            status: "CONFIRMED"
          },
          include: {
            student: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { date: "asc" },
          take: 5
        }),
        prisma.booking.findMany({
          where: {
            tutorId: tutorProfileId,
            status: "COMPLETED"
          },
          include: {
            student: {
              select: { id: true, name: true }
            }
          },
          orderBy: { updatedAt: "desc" },
          take: 5
        }),
        prisma.review.aggregate({
          where: { tutorId: tutorProfileId },
          _count: { _all: true },
          _avg: { rating: true }
        })
      ]);
      return {
        stats: {
          totalBookings,
          confirmedCount,
          completedCount,
          cancelledCount,
          totalReviews: reviewStats._count._all,
          averageRating: reviewStats._avg.rating || 0
        },
        sessions: {
          upcoming: upcomingSessions,
          recentCompleted
        }
      };
    };
    TutorService = {
      getTutorProfile,
      createOrUpdateProfile,
      getAllTutors,
      getTutorById,
      searchTutors,
      getTutorDashboard
    };
  }
});

// src/modules/tutor/tutor.controller.ts
var searchTutors2, getProfile, createOrUpdateProfile2, getAllTutors2, getTutorById2, getDashboard, TutorController;
var init_tutor_controller = __esm({
  "src/modules/tutor/tutor.controller.ts"() {
    "use strict";
    init_tutor_service();
    searchTutors2 = async (req, res) => {
      try {
        const result = await TutorService.searchTutors(req.query);
        res.json({
          success: true,
          message: "Tutors fetched successfully",
          ...result
        });
      } catch (e) {
        res.status(400).json({
          success: false,
          message: e.message
        });
      }
    };
    getProfile = async (req, res) => {
      try {
        const profile = await TutorService.getTutorProfile(req.user.userId);
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };
    createOrUpdateProfile2 = async (req, res) => {
      try {
        const payload = req.body;
        const profile = await TutorService.createOrUpdateProfile(req.user.userId, payload);
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };
    getAllTutors2 = async (_req, res) => {
      try {
        const tutors = await TutorService.getAllTutors();
        res.status(200).json({ success: true, data: tutors });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };
    getTutorById2 = async (req, res) => {
      try {
        const tutor = await TutorService.getTutorById(req.params.id);
        if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });
        res.status(200).json({ success: true, data: tutor });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };
    getDashboard = async (req, res) => {
      try {
        const data = await TutorService.getTutorDashboard(
          req.user.tutorProfileId
        );
        res.json({
          success: true,
          message: "Tutor dashboard data",
          data
        });
      } catch (e) {
        res.status(400).json({
          success: false,
          message: e.message
        });
      }
    };
    TutorController = {
      getProfile,
      createOrUpdateProfile: createOrUpdateProfile2,
      getAllTutors: getAllTutors2,
      getTutorById: getTutorById2,
      searchTutors: searchTutors2,
      getDashboard
    };
  }
});

// src/modules/tutor/tutor.route.ts
import { Router as Router2 } from "express";
var router2, tutorRoutes;
var init_tutor_route = __esm({
  "src/modules/tutor/tutor.route.ts"() {
    "use strict";
    init_tutor_controller();
    init_auth_middleware();
    init_role_middleware();
    init_enums();
    router2 = Router2();
    router2.get(
      "/dashboard",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      TutorController.getDashboard
    );
    router2.get(
      "/profile/me",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      TutorController.getProfile
    );
    router2.get("/search", TutorController.searchTutors);
    router2.get("/", TutorController.getAllTutors);
    router2.get("/:id", TutorController.getTutorById);
    router2.post(
      "/profile/me",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      TutorController.createOrUpdateProfile
    );
    router2.put(
      "/profile/me",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      TutorController.createOrUpdateProfile
    );
    tutorRoutes = router2;
  }
});

// src/modules/booking/booking.service.ts
var createBooking, getStudentBookings, getTutorBookings, completeBooking, cancelBooking, BookingService;
var init_booking_service = __esm({
  "src/modules/booking/booking.service.ts"() {
    "use strict";
    init_prisma();
    init_enums();
    createBooking = async (studentId, tutorProfileId, date) => {
      const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { id: tutorProfileId },
        include: { user: true }
      });
      if (!tutorProfile) {
        throw new Error("Tutor profile not found!!");
      }
      if (tutorProfile.user.status === "BANNED") {
        throw new Error("Tutor is banned!!");
      }
      return prisma.booking.create({
        data: {
          studentId,
          tutorId: tutorProfileId,
          date,
          status: BookingStatus.CONFIRMED
        }
      });
    };
    getStudentBookings = async (studentId) => {
      return prisma.booking.findMany({
        where: { studentId },
        include: {
          tutor: {
            include: { user: true }
          }
        },
        orderBy: { createdAt: "desc" }
      });
    };
    getTutorBookings = async (tutorProfileId) => {
      return prisma.booking.findMany({
        where: { tutorId: tutorProfileId },
        include: {
          student: true
        },
        orderBy: { createdAt: "desc" }
      });
    };
    completeBooking = async (bookingId, tutorProfileId) => {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });
      if (!booking) {
        throw new Error("Booking not found");
      }
      if (booking.tutorId !== tutorProfileId) {
        throw new Error("Unauthorized access!..");
      }
      if (booking.status !== BookingStatus.CONFIRMED) {
        throw new Error("Only confirmed bookings can be completed..");
      }
      return prisma.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.COMPLETED }
      });
    };
    cancelBooking = async (bookingId, studentId) => {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });
      if (!booking) {
        throw new Error("Booking not found!!");
      }
      if (booking.studentId !== studentId) {
        throw new Error("Unauthorized access!");
      }
      if (booking.status !== BookingStatus.CONFIRMED) {
        throw new Error("Only confirmed bookings can be cancelled!");
      }
      return prisma.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.CANCELLED }
      });
    };
    BookingService = {
      createBooking,
      getStudentBookings,
      getTutorBookings,
      completeBooking,
      cancelBooking
    };
  }
});

// src/modules/booking/booking.controller.ts
var createBooking2, getMyBookings, getTutorBookings2, completeBooking2, cancelBooking2, BookingController;
var init_booking_controller = __esm({
  "src/modules/booking/booking.controller.ts"() {
    "use strict";
    init_booking_service();
    init_prisma();
    init_enums();
    createBooking2 = async (req, res) => {
      const booking = await BookingService.createBooking(
        req.user.userId,
        req.body.tutorId,
        new Date(req.body.date)
      );
      res.status(201).json({
        success: true,
        message: "Booking created successfully..",
        data: booking
      });
    };
    getMyBookings = async (req, res) => {
      const bookings = await BookingService.getStudentBookings(req.user.userId);
      res.status(200).json({
        success: true,
        data: bookings
      });
    };
    getTutorBookings2 = async (req, res) => {
      const bookings = await BookingService.getTutorBookings(req.user.tutorProfileId);
      res.status(200).json({
        success: true,
        data: bookings
      });
    };
    completeBooking2 = async (req, res) => {
      const bookingId = req.params.id;
      const tutorProfileId = req.user.tutorProfileId;
      const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
      if (!booking) return res.status(404).json({ message: "Booking not found" });
      if (booking.tutorId !== tutorProfileId)
        return res.status(403).json({ message: "Unauthorized access" });
      if (booking.status !== BookingStatus.CONFIRMED)
        return res.status(400).json({ message: "Only confirmed bookings can be completed" });
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.COMPLETED }
      });
      res.status(200).json({
        success: true,
        message: "Booking marked as completed",
        data: updatedBooking
      });
    };
    cancelBooking2 = async (req, res) => {
      try {
        const booking = await BookingService.cancelBooking(
          req.params.id,
          req.user.userId
        );
        res.status(200).json({
          success: true,
          message: "Booking cancelled",
          data: booking
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      }
    };
    BookingController = {
      createBooking: createBooking2,
      getMyBookings,
      getTutorBookings: getTutorBookings2,
      completeBooking: completeBooking2,
      cancelBooking: cancelBooking2
    };
  }
});

// src/modules/booking/booking.route.ts
import { Router as Router3 } from "express";
var router3, BookingRoutes;
var init_booking_route = __esm({
  "src/modules/booking/booking.route.ts"() {
    "use strict";
    init_booking_controller();
    init_auth_middleware();
    init_role_middleware();
    init_enums();
    router3 = Router3();
    router3.post(
      "/",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      BookingController.createBooking
    );
    router3.get(
      "/",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      BookingController.getMyBookings
    );
    router3.patch(
      "/:id/cancel",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      BookingController.cancelBooking
    );
    router3.get(
      "/tutor",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      BookingController.getTutorBookings
    );
    router3.patch(
      "/:id/complete",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      BookingController.completeBooking
    );
    BookingRoutes = router3;
  }
});

// src/modules/review/review.service.ts
var recalcTutorRating, createReview, getTutorReviews, getStudentReviews, updateReview, deleteReview, ReviewService;
var init_review_service = __esm({
  "src/modules/review/review.service.ts"() {
    "use strict";
    init_prisma();
    init_enums();
    recalcTutorRating = async (tutorId) => {
      const tutorReviews = await prisma.review.findMany({
        where: { tutorId },
        select: { rating: true }
      });
      const avg = tutorReviews.length > 0 ? tutorReviews.reduce((a, r) => a + r.rating, 0) / tutorReviews.length : 0;
      await prisma.tutorProfile.update({
        where: { id: tutorId },
        data: { rating: avg }
      });
    };
    createReview = async (studentId, bookingId, payload) => {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });
      if (!booking) {
        throw new Error("Booking not found");
      }
      if (booking.studentId !== studentId) {
        throw new Error("Unauthorized access");
      }
      if (booking.status !== BookingStatus.COMPLETED) {
        throw new Error("Only completed bookings can be reviewed");
      }
      const existingReview = await prisma.review.findUnique({
        where: { bookingId }
      });
      if (existingReview) {
        throw new Error("Review already submitted for this booking");
      }
      if (payload.rating < 1 || payload.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      const review = await prisma.review.create({
        data: {
          studentId,
          tutorId: booking.tutorId,
          bookingId,
          rating: payload.rating,
          comment: payload.comment
        }
      });
      await recalcTutorRating(booking.tutorId);
      return review;
    };
    getTutorReviews = async (tutorProfileId) => {
      return prisma.review.findMany({
        where: { tutorId: tutorProfileId },
        include: {
          student: {
            select: { id: true, name: true, email: true }
          },
          booking: true
        },
        orderBy: { createdAt: "desc" }
      });
    };
    getStudentReviews = async (studentId) => {
      return prisma.review.findMany({
        where: { studentId },
        include: {
          tutor: {
            include: {
              user: {
                select: { id: true, name: true }
              }
            }
          },
          booking: true
        },
        orderBy: { createdAt: "desc" }
      });
    };
    updateReview = async (studentId, reviewId, payload) => {
      const review = await prisma.review.findUnique({ where: { id: reviewId } });
      if (!review) throw new Error("Review not found");
      if (review.studentId !== studentId) throw new Error("Unauthorized access");
      const sevenDays = 7 * 24 * 60 * 60 * 1e3;
      if (Date.now() - review.createdAt.getTime() > sevenDays)
        throw new Error("Review can only be edited within 7 days");
      if (payload.rating && (payload.rating < 1 || payload.rating > 5)) {
        throw new Error("Rating must be between 1 and 5");
      }
      const updated = await prisma.review.update({
        where: { id: reviewId },
        data: {
          rating: payload.rating ?? review.rating,
          comment: payload.comment ?? review.comment
        }
      });
      const tutorReviews = await prisma.review.findMany({
        where: { tutorId: review.tutorId },
        select: { rating: true }
      });
      const averageRating = tutorReviews.reduce((acc, r) => acc + r.rating, 0) / tutorReviews.length;
      await prisma.tutorProfile.update({
        where: { id: review.tutorId },
        data: { rating: averageRating }
      });
      return updated;
    };
    deleteReview = async (studentId, reviewId) => {
      const review = await prisma.review.findUnique({ where: { id: reviewId } });
      if (!review) throw new Error("Review not found");
      if (review.studentId !== studentId) throw new Error("Unauthorized access");
      await prisma.review.delete({ where: { id: reviewId } });
      const tutorReviews = await prisma.review.findMany({
        where: { tutorId: review.tutorId },
        select: { rating: true }
      });
      const averageRating = tutorReviews.length > 0 ? tutorReviews.reduce((acc, r) => acc + r.rating, 0) / tutorReviews.length : 0;
      await prisma.tutorProfile.update({
        where: { id: review.tutorId },
        data: { rating: averageRating }
      });
      return { message: "Review deleted" };
    };
    ReviewService = {
      createReview,
      getTutorReviews,
      getStudentReviews,
      updateReview,
      deleteReview
    };
  }
});

// src/modules/review/review.controller.ts
var createReview2, getTutorReviews2, getMyReviews, updateReview2, deleteReview2, ReviewController;
var init_review_controller = __esm({
  "src/modules/review/review.controller.ts"() {
    "use strict";
    init_review_service();
    createReview2 = async (req, res) => {
      try {
        const review = await ReviewService.createReview(
          req.user.userId,
          req.params.bookingId,
          req.body
        );
        res.status(201).json({
          success: true,
          message: "Review submitted successfully",
          data: review
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };
    getTutorReviews2 = async (req, res) => {
      try {
        const reviews = await ReviewService.getTutorReviews(req.user.tutorProfileId);
        res.status(200).json({ success: true, data: reviews });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };
    getMyReviews = async (req, res) => {
      try {
        const reviews = await ReviewService.getStudentReviews(req.user.userId);
        res.status(200).json({ success: true, data: reviews });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };
    updateReview2 = async (req, res) => {
      try {
        const review = await ReviewService.updateReview(
          req.user.userId,
          req.params.id,
          req.body
        );
        res.json({ success: true, data: review });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };
    deleteReview2 = async (req, res) => {
      try {
        const result = await ReviewService.deleteReview(
          req.user.userId,
          req.params.id
        );
        res.json({ success: true, ...result });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };
    ReviewController = {
      createReview: createReview2,
      getTutorReviews: getTutorReviews2,
      getMyReviews,
      updateReview: updateReview2,
      deleteReview: deleteReview2
    };
  }
});

// src/modules/review/review.route.ts
import { Router as Router4 } from "express";
var router4, reviewRoutes;
var init_review_route = __esm({
  "src/modules/review/review.route.ts"() {
    "use strict";
    init_review_controller();
    init_auth_middleware();
    init_role_middleware();
    init_enums();
    router4 = Router4();
    router4.post(
      "/bookings/:bookingId/review",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      ReviewController.createReview
    );
    router4.get(
      "/tutor/reviews",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      ReviewController.getTutorReviews
    );
    router4.get(
      "/student/reviews",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      ReviewController.getMyReviews
    );
    router4.patch(
      "/reviews/:id",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      ReviewController.updateReview
    );
    router4.delete(
      "/reviews/:id",
      authMiddleware,
      roleMiddleware(Role.STUDENT),
      ReviewController.deleteReview
    );
    reviewRoutes = router4;
  }
});

// src/modules/availability/availability.service.ts
var createAvailability, getMyAvailability, deleteAvailability, AvailabilityService;
var init_availability_service = __esm({
  "src/modules/availability/availability.service.ts"() {
    "use strict";
    init_prisma();
    createAvailability = async (tutorProfileId, payload) => {
      const { day, startTime, endTime } = payload;
      if (startTime >= endTime) {
        throw new Error("Start time must be before end time");
      }
      const exists = await prisma.availability.findFirst({
        where: {
          tutorId: tutorProfileId,
          day,
          startTime,
          endTime
        }
      });
      if (exists) {
        throw new Error("This time slot already exists");
      }
      return prisma.availability.create({
        data: {
          tutorId: tutorProfileId,
          day,
          startTime,
          endTime
        }
      });
    };
    getMyAvailability = async (tutorProfileId) => {
      return prisma.availability.findMany({
        where: { tutorId: tutorProfileId },
        orderBy: { day: "asc" }
      });
    };
    deleteAvailability = async (tutorProfileId, availabilityId) => {
      const slot = await prisma.availability.findUnique({
        where: { id: availabilityId }
      });
      if (!slot) throw new Error("Availability not found");
      if (slot.tutorId !== tutorProfileId) {
        throw new Error("Unauthorized");
      }
      await prisma.availability.delete({
        where: { id: availabilityId }
      });
      return { message: "Availability deleted" };
    };
    AvailabilityService = {
      createAvailability,
      getMyAvailability,
      deleteAvailability
    };
  }
});

// src/modules/availability/availability.controller.ts
var createAvailability2, getMyAvailability2, deleteAvailability2, AvailabilityController;
var init_availability_controller = __esm({
  "src/modules/availability/availability.controller.ts"() {
    "use strict";
    init_availability_service();
    createAvailability2 = async (req, res) => {
      try {
        const result = await AvailabilityService.createAvailability(
          req.user.tutorProfileId,
          req.body
        );
        res.status(201).json({
          success: true,
          message: "Availability added",
          data: result
        });
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
      }
    };
    getMyAvailability2 = async (req, res) => {
      const data = await AvailabilityService.getMyAvailability(
        req.user.tutorProfileId
      );
      res.json({ success: true, data });
    };
    deleteAvailability2 = async (req, res) => {
      try {
        const result = await AvailabilityService.deleteAvailability(
          req.user.tutorProfileId,
          req.params.id
        );
        res.json({ success: true, ...result });
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
      }
    };
    AvailabilityController = {
      createAvailability: createAvailability2,
      getMyAvailability: getMyAvailability2,
      deleteAvailability: deleteAvailability2
    };
  }
});

// src/modules/availability/availability.routes.ts
import { Router as Router5 } from "express";
var router5, availabilityRoutes;
var init_availability_routes = __esm({
  "src/modules/availability/availability.routes.ts"() {
    "use strict";
    init_availability_controller();
    init_auth_middleware();
    init_role_middleware();
    init_enums();
    router5 = Router5();
    router5.post(
      "/",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      AvailabilityController.createAvailability
    );
    router5.get(
      "/my",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      AvailabilityController.getMyAvailability
    );
    router5.delete(
      "/:id",
      authMiddleware,
      roleMiddleware(Role.TUTOR),
      AvailabilityController.deleteAvailability
    );
    availabilityRoutes = router5;
  }
});

// src/modules/admin/admin.service.ts
var listUsers, banUser, unbanUser, listBookings, getDashboardStats, AdminService;
var init_admin_service = __esm({
  "src/modules/admin/admin.service.ts"() {
    "use strict";
    init_enums();
    init_prisma();
    listUsers = async () => {
      return prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true
        },
        orderBy: { createdAt: "desc" }
      });
    };
    banUser = async (userId) => {
      return prisma.user.update({
        where: { id: userId },
        data: { status: UserStatus.BANNED }
      });
    };
    unbanUser = async (userId) => {
      return prisma.user.update({
        where: { id: userId },
        data: { status: UserStatus.ACTIVE }
      });
    };
    listBookings = async () => {
      return prisma.booking.findMany({
        include: {
          student: {
            select: { id: true, name: true, email: true }
          },
          tutor: {
            include: {
              user: {
                select: { id: true, name: true, email: true }
              }
            }
          }
        },
        orderBy: { createdAt: "desc" }
      });
    };
    getDashboardStats = async () => {
      const [
        totalUsers,
        totalStudents,
        totalTutors,
        totalAdmins,
        bannedUsers,
        totalBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalReviews,
        tutorAgg
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: Role.STUDENT } }),
        prisma.user.count({ where: { role: Role.TUTOR } }),
        prisma.user.count({ where: { role: Role.ADMIN } }),
        prisma.user.count({ where: { status: UserStatus.BANNED } }),
        prisma.booking.count(),
        prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
        prisma.booking.count({ where: { status: BookingStatus.COMPLETED } }),
        prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),
        prisma.review.count(),
        prisma.tutorProfile.aggregate({
          _avg: { rating: true },
          _count: true
        })
      ]);
      return {
        users: {
          total: totalUsers,
          students: totalStudents,
          tutors: totalTutors,
          admins: totalAdmins,
          banned: bannedUsers
        },
        bookings: {
          total: totalBookings,
          confirmed: confirmedBookings,
          completed: completedBookings,
          cancelled: cancelledBookings
        },
        reviews: {
          total: totalReviews
        },
        tutors: {
          totalProfiles: tutorAgg._count,
          avgRating: tutorAgg._avg.rating ?? 0
        }
      };
    };
    AdminService = {
      listUsers,
      banUser,
      unbanUser,
      listBookings,
      getDashboardStats
    };
  }
});

// src/modules/admin/admin.controller.ts
var listUsers2, banUser2, unbanUser2, listBookings2, dashboard, AdminController;
var init_admin_controller = __esm({
  "src/modules/admin/admin.controller.ts"() {
    "use strict";
    init_admin_service();
    listUsers2 = async (req, res) => {
      const users = await AdminService.listUsers();
      res.json({
        success: true,
        data: users
      });
    };
    banUser2 = async (req, res) => {
      const user = await AdminService.banUser(req.params.id);
      res.json({
        success: true,
        message: "User banned",
        data: user
      });
    };
    unbanUser2 = async (req, res) => {
      const user = await AdminService.unbanUser(req.params.id);
      res.json({
        success: true,
        message: "User unbanned",
        data: user
      });
    };
    listBookings2 = async (req, res) => {
      const bookings = await AdminService.listBookings();
      res.json({
        success: true,
        data: bookings
      });
    };
    dashboard = async (req, res) => {
      try {
        const stats = await AdminService.getDashboardStats();
        res.json({
          success: true,
          data: stats
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message || "Failed to load admin dashboard stats"
        });
      }
    };
    AdminController = {
      listUsers: listUsers2,
      banUser: banUser2,
      unbanUser: unbanUser2,
      listBookings: listBookings2,
      dashboard
    };
  }
});

// src/middlewares/requireAdmin.ts
var requireAdmin;
var init_requireAdmin = __esm({
  "src/middlewares/requireAdmin.ts"() {
    "use strict";
    requireAdmin = (req, res, next) => {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: "Admin only access"
        });
      }
      next();
    };
  }
});

// src/modules/admin/admin.route.ts
import { Router as Router6 } from "express";
var router6, adminRoutes;
var init_admin_route = __esm({
  "src/modules/admin/admin.route.ts"() {
    "use strict";
    init_admin_controller();
    init_requireAdmin();
    init_auth_middleware();
    router6 = Router6();
    router6.use(authMiddleware, requireAdmin);
    router6.get("/dashboard", AdminController.dashboard);
    router6.get("/users", AdminController.listUsers);
    router6.patch("/users/:id/ban", AdminController.banUser);
    router6.patch("/users/:id/unban", AdminController.unbanUser);
    router6.get("/bookings", AdminController.listBookings);
    adminRoutes = router6;
  }
});

// src/modules/category/category.service.ts
var createCategory, getAllCategories, updateCategory, deleteCategory, CategoryService;
var init_category_service = __esm({
  "src/modules/category/category.service.ts"() {
    "use strict";
    init_prisma();
    createCategory = async (name) => {
      return prisma.category.create({
        data: { name }
      });
    };
    getAllCategories = async () => {
      return prisma.category.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { tutors: true }
          }
        }
      });
    };
    updateCategory = async (id, name) => {
      const exists = await prisma.category.findUnique({ where: { id } });
      if (!exists) throw new Error("Category not found");
      return prisma.category.update({
        where: { id },
        data: { name }
      });
    };
    deleteCategory = async (id) => {
      const exists = await prisma.category.findUnique({
        where: { id },
        include: { tutors: true }
      });
      if (!exists) throw new Error("Category not found");
      if (exists.tutors.length > 0) {
        throw new Error("Cannot delete category linked with tutors");
      }
      return prisma.category.delete({
        where: { id }
      });
    };
    CategoryService = {
      createCategory,
      getAllCategories,
      updateCategory,
      deleteCategory
    };
  }
});

// src/modules/category/category.controller.ts
var create, list, update, remove, CategoryController;
var init_category_controller = __esm({
  "src/modules/category/category.controller.ts"() {
    "use strict";
    init_category_service();
    create = async (req, res) => {
      const data = await CategoryService.createCategory(req.body.name);
      res.status(201).json({
        success: true,
        message: "Category created",
        data
      });
    };
    list = async (_req, res) => {
      const data = await CategoryService.getAllCategories();
      res.json({ success: true, data });
    };
    update = async (req, res) => {
      const data = await CategoryService.updateCategory(
        req.params.id,
        req.body.name
      );
      res.json({ success: true, message: "Category updated", data });
    };
    remove = async (req, res) => {
      await CategoryService.deleteCategory(req.params.id);
      res.json({ success: true, message: "Category deleted" });
    };
    CategoryController = {
      create,
      list,
      update,
      remove
    };
  }
});

// src/modules/category/category.route.ts
import { Router as Router7 } from "express";
var router7, CategoryRoutes;
var init_category_route = __esm({
  "src/modules/category/category.route.ts"() {
    "use strict";
    init_auth_middleware();
    init_role_middleware();
    init_enums();
    init_category_controller();
    router7 = Router7();
    router7.use(authMiddleware, roleMiddleware(Role.ADMIN));
    router7.post("/", CategoryController.create);
    router7.get("/", CategoryController.list);
    router7.patch("/:id", CategoryController.update);
    router7.delete("/:id", CategoryController.remove);
    CategoryRoutes = router7;
  }
});

// src/modules/studentDashboard/student.dashboard.service.ts
var getDashboardOverview, getMyBookings2, getProfile2, updateProfile, StudentDashboardService;
var init_student_dashboard_service = __esm({
  "src/modules/studentDashboard/student.dashboard.service.ts"() {
    "use strict";
    init_prisma();
    init_enums();
    getDashboardOverview = async (studentId) => {
      const totalBookings = await prisma.booking.count({
        where: { studentId }
      });
      const completedBookings = await prisma.booking.count({
        where: {
          studentId,
          status: BookingStatus.COMPLETED
        }
      });
      const upcomingBookings = await prisma.booking.count({
        where: {
          studentId,
          status: BookingStatus.CONFIRMED
        }
      });
      const reviewsGiven = await prisma.review.count({
        where: { studentId }
      });
      return {
        totalBookings,
        completedBookings,
        upcomingBookings,
        reviewsGiven
      };
    };
    getMyBookings2 = async (studentId, type) => {
      let where = { studentId };
      if (type === "upcoming") {
        where.status = BookingStatus.CONFIRMED;
      }
      if (type === "past") {
        where.status = BookingStatus.COMPLETED;
      }
      return prisma.booking.findMany({
        where,
        include: {
          tutor: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: "desc" }
      });
    };
    getProfile2 = async (studentId) => {
      return prisma.user.findUnique({
        where: { id: studentId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });
    };
    updateProfile = async (studentId, payload) => {
      return prisma.user.update({
        where: { id: studentId },
        data: payload,
        select: {
          id: true,
          name: true,
          email: true
        }
      });
    };
    StudentDashboardService = {
      getDashboardOverview,
      getMyBookings: getMyBookings2,
      getProfile: getProfile2,
      updateProfile
    };
  }
});

// src/modules/studentDashboard/student.dashboard.controller.ts
var overview, myBookings, myProfile, updateProfile2, StudentDashboardController;
var init_student_dashboard_controller = __esm({
  "src/modules/studentDashboard/student.dashboard.controller.ts"() {
    "use strict";
    init_student_dashboard_service();
    overview = async (req, res) => {
      try {
        const data = await StudentDashboardService.getDashboardOverview(
          req.user.userId
        );
        res.json({
          success: true,
          data
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
    };
    myBookings = async (req, res) => {
      try {
        const type = req.query.type;
        const data = await StudentDashboardService.getMyBookings(
          req.user.userId,
          type
        );
        res.json({
          success: true,
          data
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
    };
    myProfile = async (req, res) => {
      try {
        const data = await StudentDashboardService.getProfile(
          req.user.userId
        );
        res.json({
          success: true,
          data
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
    };
    updateProfile2 = async (req, res) => {
      try {
        const data = await StudentDashboardService.updateProfile(
          req.user.userId,
          req.body
        );
        res.json({
          success: true,
          message: "Profile updated",
          data
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
    };
    StudentDashboardController = {
      overview,
      myBookings,
      myProfile,
      updateProfile: updateProfile2
    };
  }
});

// src/modules/studentDashboard/student.dashboard.route.ts
import { Router as Router8 } from "express";
var router8, studentDashboardRoutes;
var init_student_dashboard_route = __esm({
  "src/modules/studentDashboard/student.dashboard.route.ts"() {
    "use strict";
    init_auth_middleware();
    init_role_middleware();
    init_enums();
    init_student_dashboard_controller();
    router8 = Router8();
    router8.use(authMiddleware, roleMiddleware(Role.STUDENT));
    router8.get("/", StudentDashboardController.overview);
    router8.get("/bookings", StudentDashboardController.myBookings);
    router8.get("/profile", StudentDashboardController.myProfile);
    router8.patch("/profile", StudentDashboardController.updateProfile);
    studentDashboardRoutes = router8;
  }
});

// src/app.ts
import express2 from "express";
var app, app_default;
var init_app = __esm({
  "src/app.ts"() {
    "use strict";
    init_auth_route();
    init_errorHandler();
    init_tutor_route();
    init_booking_route();
    init_review_route();
    init_availability_routes();
    init_admin_route();
    init_category_route();
    init_student_dashboard_route();
    app = express2();
    app.use(express2.json());
    app.get("/", (req, res) => {
      res.send("Hello, Server !!");
    });
    app.use(globalErrorHandler);
    app.use("/api/auth", authRoutes);
    app.use("/api/dashboard", studentDashboardRoutes);
    app.use("/api/tutors", tutorRoutes);
    app.use("/api/bookings", BookingRoutes);
    app.use("/api", reviewRoutes);
    app.use("/api/availability", availabilityRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/admin/categories", CategoryRoutes);
    app_default = app;
  }
});

// src/server.ts
var require_server = __commonJS({
  "src/server.ts"() {
    init_app();
    init_prisma();
    var PORT = process.env.PORT || 5e3;
    async function main() {
      try {
        await prisma.$connect();
        console.log("Connected to the database successfully");
        app_default.listen(PORT, () => {
          console.log(`SkillBridge server is cooking on http://localhost:${PORT}`);
        });
      } catch (error) {
        console.log("An error occured", error);
        await prisma.$disconnect();
        process.exit(1);
      }
    }
    main();
  }
});
export default require_server();

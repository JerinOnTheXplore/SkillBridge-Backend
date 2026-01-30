import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/", CategoryController.list);
router.post("/admin", 
 authMiddleware,
 roleMiddleware(Role.ADMIN),
 CategoryController.create);
router.patch("/admin/:id",
 authMiddleware,
 roleMiddleware(Role.ADMIN),
 CategoryController.update);
router.delete("/admin/:id",
 authMiddleware,
 roleMiddleware(Role.ADMIN), 
 CategoryController.remove);

export const CategoryRoutes = router;

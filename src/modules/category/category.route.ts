import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";
import { CategoryController } from "./category.controller";

const router = Router();

router.use(authMiddleware, roleMiddleware(Role.ADMIN));

router.post("/", CategoryController.create);
router.get("/", CategoryController.list);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export const CategoryRoutes = router;

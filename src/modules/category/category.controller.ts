import { Request, Response } from "express";
import { CategoryService } from "../category/category.service";

const create = async (req: Request, res: Response) => {
  const data = await CategoryService.createCategory(req.body.name);

  res.status(201).json({
    success: true,
    message: "Category created",
    data,
  });
};

const list = async (_req: Request, res: Response) => {
  const data = await CategoryService.getAllCategories();

  res.json({ success: true, data });
};

const update = async (req: Request, res: Response) => {
  const data = await CategoryService.updateCategory(
    req.params.id as string,
    req.body.name
  );

  res.json({ success: true, message: "Category updated", data });
};

const remove = async (req: Request, res: Response) => {
  await CategoryService.deleteCategory(req.params.id as string);

  res.json({ success: true, message: "Category deleted" });
};

export const CategoryController = {
  create,
  list,
  update,
  remove,
};

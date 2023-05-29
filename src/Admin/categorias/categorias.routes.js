const express = require("express");
const { bodyValidator, paramValidator } = require("./categorias.validator");
const {
  getAllCategoriesController,
  createCategoryController,
  deleteCategoryController,
  editCategoryController,
} = require("./categorias.controller");
const router = express.Router();

router.get("/categories", getAllCategoriesController);
router.post("/categories", bodyValidator, createCategoryController);
router.put(
  "/categories/:id",
  paramValidator,
  bodyValidator,
  editCategoryController
);
router.delete("/categories/:id", paramValidator, deleteCategoryController);

module.exports = router;

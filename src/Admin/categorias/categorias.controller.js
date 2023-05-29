const { successResponse } = require("../../handlers/responseHandlers");
const {
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
} = require("./categorias.services");

const getAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    return successResponse({ categories }, "All categories")(res);
  } catch (error) {
    next(error);
  }
};

const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);
    return successResponse({ category }, "Category created")(res);
  } catch (error) {
    next(error);
  }
};

const editCategoryController = async (req, res, next) => {
  try {
    const category = await editCategory(Number(req.params.id), req.body);
    return successResponse({ category }, "Category updated")(res);
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    await deleteCategory(Number(req.params.id));
    return successResponse("Category deleted")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategoriesController,
  createCategoryController,
  editCategoryController,
  deleteCategoryController,
};

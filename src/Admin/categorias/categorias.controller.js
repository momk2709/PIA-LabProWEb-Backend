const getAllCategoriesController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const createCategoryController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const editCategoryController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    res.sendStatus(200);
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

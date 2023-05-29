const { prisma } = require("../../db/prisma");
const { NotFoundError } = require("../../handlers/AppError");

const getAllCategories = async () => {
  const categories = await prisma.categoria.findMany();

  return categories;
};

const createCategory = async ({ nombre, descripcion, imagenUrl }) => {
  const category = await prisma.categoria.create({
    data: {
      nombre,
      descripcion,
      imagenUrl,
    },
  });

  return category;
};

const editCategory = async (id, { nombre, descripcion, imagenUrl }) => {
  const isCategory = await prisma.categoria.findUnique({
    where: {
      id,
    },
  });

  if (!isCategory) throw NotFoundError.create("Category not found");

  const updatedCategory = await prisma.categoria.update({
    where: {
      id,
    },
    data: {
      nombre,
      descripcion,
      imagenUrl,
    },
  });

  return updatedCategory;
};

const deleteCategory = async (id) => {
  const category = await prisma.categoria.findUnique({
    where: {
      id,
    },
  });

  if (!category) throw NotFoundError.create("Category not found");

  const deletedCategory = await prisma.categoria.delete({
    where: {
      id,
    },
  });

  return deletedCategory;
};

module.exports = {
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
};

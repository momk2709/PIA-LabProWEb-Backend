const { prisma } = require("../../db/prisma");
const { UnauthorizedError, NotFoundError } = require("../../handlers/AppError");

const getAllCourses = async () => {
  const courses = await prisma.curso.findMany();
  return courses;
};

module.exports = {
  getAllCourses,
};

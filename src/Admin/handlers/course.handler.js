const { prisma } = require("../../db/prisma");

const getAllCourses = async () => {
  const courses = await prisma.curso.findMany();
  return courses;
};
module.exports = {
  getAllCourses,
};

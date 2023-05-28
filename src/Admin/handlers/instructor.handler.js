const { prisma } = require("../../db/prisma");

const getAllInstructor = async () => {
  const instructores = await prisma.instructor.findMany();
  return instructores;
};

module.exports = { getAllInstructor };

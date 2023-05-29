const { prisma } = require("../../db/prisma");
const { ForbiddenError, NotFoundError } = require("../../handlers/AppError");

const getAllCourses = async () => {
  const courses = await prisma.curso.findMany();

  return courses;
};

const createCourse = async ({
  nombre,
  descripcion,
  precio,
  fecha_inicio,
  fecha_fin,
}) => {
  const course = await prisma.curso.create({
    data: {
      nombre,
      descripcion,
      precio,
      fecha_inicio,
      fecha_fin,
    },
  });

  return course;
};

const editCourse = async (
  id,
  { nombre, descripcion, precio, fecha_inicio, fecha_fin }
) => {
  const course = await prisma.curso.findUnique({
    where: {
      id,
    },
  });

  if (!course) throw NotFoundError.create("Course not found");

  const updatedCourse = await prisma.curso.update({
    where: {
      id,
    },
    data: {
      nombre,
      descripcion,
      precio,
      fecha_inicio,
      fecha_fin,
    },
  });

  return updatedCourse;
};

const deleteCourse = async (id) => {
  const course = await prisma.curso.findUnique({
    where: {
      id,
    },
  });

  if (!course) throw NotFoundError.create("Course not found");

  const deletedCourse = await prisma.curso.delete({
    where: {
      id,
    },
  });

  return deletedCourse;
};

module.exports = {
  getAllCourses,
  createCourse,
  editCourse,
  deleteCourse,
};

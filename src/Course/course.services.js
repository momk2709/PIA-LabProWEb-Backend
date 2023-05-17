const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();
const createCourse = async ({
  nombre,
  categoria_id,
  descripcion,
  precio,
  instructor_id,
  fecha_inicio,
  fecha_fin,
}) => {
  const isValidCategorie = await prisma.categoria.findUnique({
    where: {
      id: categoria_id,
    },
  });
  if (!isValidCategorie) {
    throw NotFoundError.create("Categoria no es valida");
  }
  const isValidInstructor = await prisma.instructor.findUnique({
    where: {
      id: instructor_id,
    },
  });
  if (!isValidInstructor) {
    throw NotFoundError.create("Instructor no es valida");
  }
  const curso = await prisma.curso.create({
    data: {
      nombre,
      categoria_id,
      descripcion,
      precio,
      instructor_id,
      fecha_inicio,
      fecha_fin,
    },
  });
  return curso;
};
const getCourseDetail = async (id) => {
  const curso = await prisma.curso.findUnique({
    where: {
      id,
    },
  });
  if (!curso) {
    throw NotFoundError.create("Curso no encontrado");
  }
  return curso;
};
const getCoursesByGenre = async (categoria_id) => {
  const cursos = await prisma.curso.findMany({
    where: {
      categoria_id,
    },
  });
  if (!cursos) {
    throw NotFoundError.create("No existen cursos en esta categoria.");
  }
  return cursos;
};
const getGenres = async () => {
  const categorias = await prisma.categoria.findMany();
  return categorias;
};
module.exports = {
  createCourse,
  getCourseDetail,
  getCoursesByGenre,
  getGenres,
};

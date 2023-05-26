const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();
const createCourse = async ({
  nombre,
  categoria_id,
  descripcion,
  precio,
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

  const curso = await prisma.curso.create({
    data: {
      nombre,
      categoria_id,
      descripcion,
      precio,
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
    include: {
      Instructor_Curso: {
        include: {
          Instructor: true,
        },
      },
    },
  });
  if (!curso) {
    throw NotFoundError.create("Curso no encontrado");
  }

  const datosCurso = {
    id: curso.id,
    nombre: curso.nombre,
    descripcion: curso.descripcion,
    precio: curso.precio,
    fecha_inicio: curso.fecha_inicio,
    fecha_fin: curso.fecha_fin,
    categoria_id: curso.categoria_id,
  };

  const instructores = curso.Instructor_Curso.map((instructorCurso) => {
    const instructor = instructorCurso.Instructor;
    return {
      id: instructor.id,
      nombre: instructor.nombre,
      email: instructor.email,
      descripcion: instructor.descripcion,
      telefono: instructor.telefono,
    };
  });
  return { datosCurso, instructores };
};
const getCoursesByGenre = async (categoria_id) => {
  const cursos = await prisma.curso.findMany({
    where: {
      categoria_id,
    },
    include: {
      Categoria: true,
    },
  });
  if (!cursos) {
    throw NotFoundError.create("No existen cursos en esta categoria.");
  }

  const cleanData = {
    categoria: {
      nombre: cursos[0].Categoria.nombre,
      descripcion: cursos[0].Categoria.descripcion,
      imagenUrl: cursos[0].Categoria.imagenUrl,
    },
    cursos: cursos.map((curso) => {
      return {
        id: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        precio: curso.precio,
        fechaInicio: curso.fecha_inicio,
        fechaFin: curso.fecha_fin,
      };
    }),
  };
  return cleanData;
};
const getGenres = async () => {
  const categorias = await prisma.categoria.findMany();
  return categorias;
};
const getAllCourses = async () => {
  const cursos = await prisma.curso.findMany();
  return cursos;
};
const updateCourse = async (
  { nombre, categoria_id, descripcion, precio, fecha_inicio, fecha_fin },
  id
) => {
  const isCursoValid = await prisma.curso.findUnique({
    where: {
      id,
    },
  });
  if (!isCursoValid) {
    throw NotFoundError.create("No se encontro el curso");
  }
  const isValidCategorie = await prisma.categoria.findUnique({
    where: { id: categoria_id },
  });
  if (!isValidCategorie) {
    throw NotFoundError.create("No se encontro la categoria");
  }
  const updatedCourse = await prisma.curso.update({
    where: { id },
    data: {
      nombre,
      categoria_id,
      descripcion,
      precio,
      fecha_inicio,
      fecha_fin,
    },
  });
  return updatedCourse;
};
const deleteCourse = async (id) => {
  const deletedCourse = await prisma.curso.delete({
    where: { id },
  });
  if (!deletedCourse) {
    throw NotFoundError.create("No se encontro el curso");
  }
  return deletedCourse;
};
module.exports = {
  createCourse,
  getCourseDetail,
  getCoursesByGenre,
  getGenres,
  getAllCourses,
  updateCourse,
  deleteCourse,
};

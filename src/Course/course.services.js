const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();

const createCourse = async ({
  nombre,
  descripcion,
  precio,
  fecha_inicio,
  fecha_fin,
}) => {
  const curso = await prisma.curso.create({
    data: {
      nombre,
      descripcion,
      precio,
      fecha_inicio,
      fecha_fin,
    },
  });
  return curso;
};
const getCourseDetail = async (id) => {
  const isCurso = await prisma.curso.findUnique({
    where: {
      id,
    },
    include: {
      Categoria_Curso: {
        include: {
          Categoria: true,
        },
      },
      Instructor_Curso: {
        include: {
          Instructor: true,
        },
      },
    },
  });
  if (!isCurso) {
    throw NotFoundError.create("Curso no encontrado");
  }

  const curso = {
    id: isCurso.id,
    nombre: isCurso.nombre,
    descripcion: isCurso.descripcion,
    precio: isCurso.precio,
    fecha_inicio: isCurso.fecha_inicio,
    fecha_fin: isCurso.fecha_fin,
    categoria_id: isCurso.categoria_id,
    imagenUrl: isCurso.Categoria_Curso[0].Categoria.imagenUrl,
  };

  const instructores = isCurso.Instructor_Curso.map((instructorCurso) => {
    const instructor = instructorCurso.Instructor;
    return {
      id: instructor.id,
      nombre: instructor.nombre,
      email: instructor.email,
      descripcion: instructor.descripcion,
      telefono: instructor.telefono,
      imagenUrl: instructor.imagenUrl,
    };
  });

  return { curso, instructores };
};
const getCoursesByGenre = async (categoria_id) => {
  const isValidGenre = await prisma.categoria.findUnique({
    where: {
      id: categoria_id,
    },
  });

  if (!isValidGenre) {
    throw NotFoundError.create("Categoria no encontrada");
  }
  const cursos = await prisma.categoria_Curso.findMany({
    where: {
      categoria_id,
    },

    include: {
      Curso: true,
      Categoria: true,
    },
  });

  const cleanData = {
    categoria: {
      id: cursos[0].Categoria.id,
      nombre: cursos[0].Categoria.nombre,
      descripcion: cursos[0].Categoria.descripcion,
      imagenUrl: cursos[0].Categoria.imagenUrl,
    },
    cursos: cursos.map((curso) => {
      return {
        id: curso.Curso.id,
        nombre: curso.Curso.nombre,
        descripcion: curso.Curso.descripcion,
        precio: curso.Curso.precio,
        fechaInicio: curso.Curso.fecha_inicio,
        fechaFin: curso.Curso.fecha_fin,
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
  const cursos = await prisma.curso.findMany({
    include: {
      Categoria_Curso: {
        include: {
          Categoria: true,
        },
      },
    },
  });

  const cleanData = cursos.map((curso) => {
    return {
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      precio: curso.precio,
      fechaInicio: curso.fecha_inicio,
      fechaFin: curso.fecha_fin,
      categorias: curso.Categoria_Curso.map((categoriaCurso) => {
        return {
          id: categoriaCurso.Categoria.id,
          nombre: categoriaCurso.Categoria.nombre,
        };
      }),
    };
  });
  return cleanData;
};

const updateCourse = async (
  { nombre, descripcion, precio, fecha_inicio, fecha_fin },
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

  const updatedCourse = await prisma.curso.update({
    where: { id },
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

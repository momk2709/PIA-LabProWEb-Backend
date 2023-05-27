const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();
const createInstructor = async ({ nombre, email, descripcion, telefono }) => {
  const instructor = await prisma.instructor.create({
    data: {
      nombre,
      email,
      descripcion,
      telefono,
    },
  });
  return instructor;
};
const getAllInstructor = async () => {
  const instructores = await prisma.instructor.findMany();
  return instructores;
};
const getInstructorDetail = async (id) => {
  const instructor = await prisma.instructor.findUnique({
    where: {
      id,
    },
    include: {
      Instructor_Curso: {
        include: {
          Curso: true,
        },
      },
      Instructorcalificacion: true,
    },
  });
  if (!instructor) {
    throw NotFoundError.create("Instructor no encontrado");
  }
  return instructor;
};
const updateInstructor = async (
  { nombre, email, descripcion, telefono },
  id
) => {
  const updatedInstructor = await prisma.instructor.update({
    where: { id },
    data: {
      nombre,
      email,
      descripcion,
      telefono,
    },
  });
  if (!updatedInstructor) {
    throw NotFoundError.create("Instructor no encontrado");
  }
  return updatedInstructor;
};
const deleteInstructor = async (id) => {
  const deletedInstructor = await prisma.instructor.delete({
    where: { id },
  });
  if (!deletedInstructor) {
    throw NotFoundError.create("No se encontro instructor");
  }
  return deletedInstructor;
};

const addInstructorCourse = async (instructorId, cursoId) => {
  const isInstructor = await prisma.instructor.findUnique({
    where: {
      id: instructorId,
    },
  });

  if (!isInstructor) {
    throw NotFoundError.create("Instructor no encontrado");
  }

  const isCurso = await prisma.curso.findUnique({
    where: {
      id: cursoId,
    },
  });

  if (!isCurso) {
    throw NotFoundError.create("Curso no encontrado");
  }

  const instructorCurso = await prisma.instructor_Curso.create({
    data: {
      instructor_id: instructorId,
      curso_id: cursoId,
    },
  });

  return instructorCurso;
};
module.exports = {
  createInstructor,
  getAllInstructor,
  getInstructorDetail,
  updateInstructor,
  deleteInstructor,
  addInstructorCourse,
};

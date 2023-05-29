const { prisma } = require("../../db/prisma");
const { ForbiddenError, NotFoundError } = require("../../handlers/AppError");

const getAllInstructors = async () => {
  const instructores = await prisma.instructor.findMany();

  return instructores;
};

const createInstructor = async ({
  nombre,
  email,
  descripcion,
  telefono,
  imagenUrl,
}) => {
  const instructor = await prisma.instructor.create({
    data: {
      nombre,
      email,
      descripcion,
      telefono,
      imagenUrl,
    },
  });

  return instructor;
};

const editInstructor = async (
  id,
  { nombre, email, descripcion, telefono, imagenUrl }
) => {
  const isInstuctor = await prisma.instructor.findUnique({
    where: {
      id,
    },
  });

  if (!isInstuctor) throw NotFoundError.create("Instructor not found");

  const updatedInstructor = await prisma.instructor.update({
    where: {
      id,
    },
    data: {
      nombre,
      email,
      descripcion,
      telefono,
      imagenUrl,
    },
  });

  return updatedInstructor;
};

const deleteInstructor = async (id) => {
  const instructor = await prisma.instructor.findUnique({
    where: {
      id,
    },
  });

  if (!instructor) throw NotFoundError.create("Instructor not found");

  const deletedInstructor = await prisma.instructor.delete({
    where: {
      id,
    },
  });

  return deletedInstructor;
};

module.exports = {
  getAllInstructors,
  createInstructor,
  editInstructor,
  deleteInstructor,
};

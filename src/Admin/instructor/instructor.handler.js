const { prisma } = require("../../db/prisma");
const { UnauthorizedError, NotFoundError } = require("../../handlers/AppError");

const getAllInstructor = async () => {
  const instructores = await prisma.instructor.findMany();
  return instructores;
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
module.exports = { getAllInstructor, updateInstructor };

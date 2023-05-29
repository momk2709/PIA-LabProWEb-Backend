const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();

const getUser = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
    include: {
      Inscripcion: true,
    },
  });
  if (!user) {
    throw NotFoundError.create("El usuario no se encontro");
  }
  return user;
};
const getUserFactura = async (userId) => {
  const factura = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
    include: {
      Inscripcion: {},
    },
  });
  if (!factura) {
    throw NotFoundError.create("El usuario no se encontro");
  }
  return factura;
};

module.exports = { getUser, getUserFactura };

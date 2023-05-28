const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();

const getUsuario = async (userId) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
    include: {
      Inscripcion: true,
    },
  });
  if (!usuario) {
    throw NotFoundError.create("Usuario no existe");
  }
  return getUsuario;
};

const getFactura = async (userId) => {
  const factura = await prisma.usuario.findUnique({
    where: { id: userId },
    include: {
      Inscripcion: {
        include: {
          Factura: {
            include: {
              Status_Factura: true,
            },
          },
        },
      },
    },
  });
  if (!factura) {
    throw NotFoundError.create("Usuario no existe");
  }
  return getFactura;
};

module.exports = { getUsuario, getFactura };

const { prisma } = require("../db/prisma");
const { NotFoundError } = require("../handlers/AppError");

const getUserProfile = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw NotFoundError.create("User not found");

  const inscripcion = await prisma.inscripcion.findMany({
    where: {
      usuario_id: userId,
    },
    include: {
      Curso: true,
    },
  });

  const userFacturas = await prisma.factura.findMany({
    where: {
      usuario_id: userId,
    },
    include: {
      Status_Factura: true,
    },
  });

  const facturas = userFacturas.map((factura) => {
    return {
      id: factura.id,
      fecha: factura.fecha,
      status: factura.Status_Factura.nombre,
      precio: factura.precio,
    };
  });

  const cursos = inscripcion.map((inscripcion) => inscripcion.Curso);

  return {
    cursos,
    facturas,
  };
};

module.exports = { getUserProfile };

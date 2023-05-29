const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();

const createFactura = async ({ fecha, rfc, precio }) => {
  const factura = await prisma.factura.create({
    data: {
      fecha,
      rfc,
      precio,
    },
  });
  return factura;
};

module.exports = { createFactura };

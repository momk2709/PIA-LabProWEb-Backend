const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createInforme = async ({ nombre, telefono, email, mensaje }) => {
  const informe = await prisma.informe.create({
    data: {
      nombre,
      telefono,
      email,
      mensaje,
    },
  });
  return informe;
};

module.exports = createInforme;

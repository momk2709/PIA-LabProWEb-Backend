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

const getFactura = async (facturaId) => {
  const factura = await prisma.factura.findUnique({
    where: {
      id: facturaId,
    },
    include: {
      Status_Factura: true,
      Inscripcion: {
        include: {
          Curso: true,
        },
      },
    },
  });

  if (!factura) throw NotFoundError.create("Factura not found");

  const cleanData = {
    id: factura.id,
    fechaInscripcion: factura.Inscripcion.fecha_inscripcion,
    status: factura.Status_Factura.nombre,
    precio: factura.precio,
    curso: factura.Inscripcion.Curso.nombre,
    rfc: factura.rfc == null ? "" : factura.rfc,
  };
  return cleanData;
};

const editFactura = async (facturaId, { rfc }) => {
  const factura = await prisma.factura.findUnique({
    where: {
      id: facturaId,
    },
  });

  if (!factura) throw NotFoundError.create("Factura not found");

  const updatedFactura = await prisma.factura.update({
    where: {
      id: facturaId,
    },
    data: {
      rfc,
    },
  });

  return updatedFactura;
};

module.exports = { getUserProfile, getFactura, editFactura };

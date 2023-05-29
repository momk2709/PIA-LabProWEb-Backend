const { prisma } = require("../../db/prisma");
const { ForbiddenError, NotFoundError } = require("../../handlers/AppError");

const getAllFacturas = async () => {
  const facturas = await prisma.factura.findMany({
    include: {
      Inscripcion: {
        include: {
          Usuario: true,
          Curso: true,
        },
      },
      Status_Factura: true,
    },
  });

  const cleanData = facturas.map((item) => {
    return {
      id: item.id,
      usuario_id: item.usuario_id,
      curso_id: item.curso_id,
      usuario: item.Inscripcion.Usuario.email,
      curso: item.Inscripcion.Curso.nombre,
      fecha: item.fecha,
      status: item.Status_Factura.nombre,
      rfc: item.rfc,
      precio: item.precio,
    };
  });

  return cleanData;
};

const updateFactura = async (id, { status_factura }) => {
  const statusId = await prisma.status_Factura.findFirst({
    where: {
      nombre: status_factura,
    },
  });

  if (!statusId) {
    throw new NotFoundError("Status not found");
  }

  const factura = await prisma.factura.findUnique({
    where: {
      id,
    },
  });

  if (!factura) {
    throw new NotFoundError("Factura not found");
  }

  const updatedFactura = await prisma.factura.update({
    where: {
      id,
    },

    data: {
      status_factura_id: statusId.id,
    },

    include: {
      Status_Factura: true,
    },
  });

  return {
    id: updatedFactura.id,
    usuario_id: updatedFactura.usuario_id,
    curso_id: updatedFactura.curso_id,
    fecha: updatedFactura.fecha,
    status: updatedFactura.Status_Factura.nombre,
    rfc: updatedFactura.rfc,
    precio: updatedFactura.precio,
  };
};
module.exports = {
  getAllFacturas,
  updateFactura,
};

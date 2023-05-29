const { prisma } = require("../../db/prisma");
const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");
const {
  successResponse,
  noContentResponse,
} = require("../../handlers/responseHandlers");
const { NotFoundError, ForbiddenError } = require("../../handlers/AppError");

const express = require("express");

const router = express.Router();

const bodyValidation = [
  body("usuario_id")
    .isInt()
    .withMessage("usuario_id must be an integer ")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("usuario_id must be greater than 0");
      }

      return true;
    }),
  body("curso_id")
    .isInt()
    .withMessage("curso_id must be an integer ")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("curso_id must be greater than 0");
      }

      return true;
    }),
  validationErrors,
];

router.get("/curso-user", async (req, res, next) => {
  try {
    const cursoUser = await prisma.inscripcion.findMany({
      include: {
        Curso: true,
        Usuario: true,
      },
    });

    const cleanData = cursoUser.map((item) => {
      return {
        usuario_id: item.usuario_id,
        curso_id: item.curso_id,
        usuario: item.Usuario.email,
        curso: item.Curso.nombre,
      };
    });

    return successResponse({ cursoUser: cleanData }, "All cursoUser")(res);
  } catch (error) {
    next(error);
  }
});

router.post("/curso-user", bodyValidation, async ({ body }, res, next) => {
  try {
    const [isUser, isCurso] = await prisma.$transaction([
      prisma.usuario.findUnique({
        where: {
          id: body.usuario_id,
        },
      }),
      prisma.curso.findUnique({
        where: {
          id: body.curso_id,
        },
      }),
    ]);

    if (!isUser) {
      throw NotFoundError.create("Usuario no encontrado");
    }

    if (!isCurso) {
      throw NotFoundError.create("Curso no encontrado");
    }
    const isValid = await prisma.inscripcion.findUnique({
      where: {
        usuario_id_curso_id: {
          usuario_id: body.usuario_id,
          curso_id: body.curso_id,
        },
      },
    });

    if (isValid) {
      throw ForbiddenError.create("Ya esta inscrito en este curso");
    }

    const cursoUser = await prisma.inscripcion.create({
      data: {
        usuario_id: body.usuario_id,
        curso_id: body.curso_id,
      },
      include: {
        Curso: true,
      },
    });

    const factura = await prisma.factura.create({
      data: {
        usuario_id: cursoUser.usuario_id,
        curso_id: cursoUser.curso_id,
        fecha: new Date(),
        precio: cursoUser.Curso.precio,
      },
    });

    return successResponse({ cursoUser, factura }, "cursoUser created")(res);
  } catch (error) {
    next(error);
  }
});

router.delete("/curso-user", async (req, res, next) => {
  try {
    const [isUser, isCurso] = await prisma.$transaction([
      prisma.usuario.findUnique({
        where: {
          id: req.body.usuario_id,
        },
      }),
      prisma.curso.findUnique({
        where: {
          id: req.body.curso_id,
        },
      }),
    ]);

    if (!isUser) {
      throw NotFoundError.create("Usuario no encontrado");
    }

    if (!isCurso) {
      throw NotFoundError.create("Curso no encontrado");
    }

    const isValid = await prisma.inscripcion.findUnique({
      where: {
        usuario_id_curso_id: {
          usuario_id: req.body.usuario_id,
          curso_id: req.body.curso_id,
        },
      },
    });

    if (!isValid) {
      throw NotFoundError.create("No esta inscrito en este curso");
    }

    await prisma.inscripcion.delete({
      where: {
        usuario_id_curso_id: {
          usuario_id: req.body.usuario_id,
          curso_id: req.body.curso_id,
        },
      },
    });

    return noContentResponse("cursoUser deleted")(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

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

router.get("/curso-category", async (req, res, next) => {
  try {
    const cursoCategory = await prisma.categoria_Curso.findMany({
      include: {
        Curso: true,
        Categoria: true,
      },
    });

    const cleanData = cursoCategory.map((item) => {
      return {
        categoria_id: item.categoria_id,
        curso_id: item.curso_id,
        categoria: item.Categoria.nombre,
        curso: item.Curso.nombre,
      };
    });

    return successResponse(
      { cursoCategory: cleanData },
      "All cursoCategory"
    )(res);
  } catch (error) {
    next(error);
  }
});

router.post("/curso-category", bodyValidation, async ({ body }, res, next) => {
  try {
    const isValid = await prisma.categoria_Curso.findUnique({
      where: {
        categoria_id_curso_id: {
          categoria_id: body.categoria_id,
          curso_id: body.curso_id,
        },
      },
    });

    if (isValid) {
      throw ForbiddenError.create("This curso is already assigned");
    }

    const cursoCategory = await prisma.categoria_Curso.create({
      data: {
        categoria_id: body.categoria_id,
        curso_id: body.curso_id,
      },
    });

    return successResponse({ cursoCategory }, "cursoCategory created")(res);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/curso-category/",
  bodyValidation,
  async ({ body }, res, next) => {
    try {
      const isValid = await prisma.categoria_Curso.findUnique({
        where: {
          categoria_id_curso_id: {
            categoria_id: body.categoria_id,
            curso_id: body.curso_id,
          },
        },
      });

      if (!isValid) {
        throw NotFoundError.create("This curso is not assigned");
      }

      const cursoCategory = await prisma.categoria_Curso.delete({
        where: {
          categoria_id_curso_id: {
            categoria_id: body.categoria_id,
            curso_id: body.curso_id,
          },
        },
      });

      return noContentResponse("cursoCategory deleted")(res);
    } catch (error) {
      next(error);
    }
  }
);

const bodyValidation = [
  body("categoria_id")
    .isInt()
    .custom((value) => {
      if (value <= 0) {
        throw new Error("categoria_id must be greater than 0");
      }

      return true;
    }),
  body("curso_id")
    .isInt()
    .custom((value) => {
      if (value <= 0) {
        throw new Error("curso_id must be greater than 0");
      }

      return true;
    }),

  validationErrors,
];
module.exports = router;

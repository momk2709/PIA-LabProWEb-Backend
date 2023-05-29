const { prisma } = require("../../db/prisma");
const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");
const { successResponse } = require("../../handlers/responseHandlers");
const { NotFoundError } = require("../../handlers/AppError");

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

router.post("/curso-category", async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/curso-category/:id", async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

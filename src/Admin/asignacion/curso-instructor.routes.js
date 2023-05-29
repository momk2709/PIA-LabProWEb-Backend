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
  body("instructor_id")
    .isInt()
    .withMessage("instructor_id must be an integer ")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("instructor_id must be greater than 0");
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

router.get("/curso-instructor", async (req, res, next) => {
  try {
    const cursoInstructor = await prisma.instructor_Curso.findMany({
      include: {
        Curso: true,
        Instructor: true,
      },
    });

    const cleanData = cursoInstructor.map((item) => {
      return {
        instructor_id: item.instructor_id,
        curso_id: item.curso_id,
        instructor: item.Instructor.nombre,
        curso: item.Curso.nombre,
      };
    });

    return successResponse(
      { cursoInstructor: cleanData },
      "All cursoInstructor"
    )(res);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/curso-instructor",
  bodyValidation,
  async ({ body }, res, next) => {
    try {
      const isValid = await prisma.instructor_Curso.findUnique({
        where: {
          instructor_id_curso_id: {
            instructor_id: body.instructor_id,
            curso_id: body.curso_id,
          },
        },
      });

      if (isValid) {
        throw ForbiddenError.create("This instructor already have this course");
      }

      const cursoInstructor = await prisma.instructor_Curso.create({
        data: {
          instructor_id: body.instructor_id,
          curso_id: body.curso_id,
        },
      });

      return successResponse(
        { cursoInstructor },
        "cursoInstructor created"
      )(res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/curso-instructor", bodyValidation, async (req, res, next) => {
  try {
    const isValid = await prisma.instructor_Curso.findUnique({
      where: {
        instructor_id_curso_id: {
          instructor_id: req.body.instructor_id,
          curso_id: req.body.curso_id,
        },
      },
    });

    if (!isValid) {
      throw NotFoundError.create("This instructor does not have this course");
    }

    await prisma.instructor_Curso.delete({
      where: {
        instructor_id_curso_id: {
          instructor_id: req.body.instructor_id,
          curso_id: req.body.curso_id,
        },
      },
    });

    return noContentResponse("cursoInstructor deleted")(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

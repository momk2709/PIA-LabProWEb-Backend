const express = require("express");
const { prisma } = require("../../db/prisma");
const { successResponse } = require("../../handlers/responseHandlers");
const router = express.Router();

router.get("/informes", async (req, res, next) => {
  try {
    const informes = await prisma.informe.findMany();

    return successResponse({ informes }, "All informes")(res);
  } catch (error) {
    next(error);
  }
});

router.delete("/informes/:id", async (req, res, next) => {
  try {
    await prisma.informe.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return successResponse("Informe deleted")(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

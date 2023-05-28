const checkJWT = require("../middlewares/session.middleware");
const express = require("express");
const router = express.Router();
const {
  getAllInstructorController,
  getAllCoursesController,
  getAllUsersController,
} = require("./admin.controller");
const { isAdmin } = require("./admin.middleware");

router.use(checkJWT);

router.get("/instructor", getAllInstructorController);
router.get("/course", getAllCoursesController);
router.get("/users", getAllUsersController);

module.exports = router;

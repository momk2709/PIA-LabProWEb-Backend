const express = require("express");
const {
  updateBodyValidator,
  createBodyValidator,
  paramValidator,
} = require("./users.validator");
const {
  getAllUsersController,
  createUserController,
  deleteUserController,
  updateUserController,
} = require("./users.controller");

const router = express.Router();

router.get("/users", getAllUsersController);
router.post("/users", createBodyValidator, createUserController);
router.put(
  "/users/:id",
  paramValidator,
  updateBodyValidator,
  updateUserController
);
router.delete("/users/:id", paramValidator, deleteUserController);

module.exports = router;

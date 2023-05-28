const express = require("express");
const router = express.Router();
const {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("./users.controller");
const {
  createUserValidation,
  updateUserValidator,
  paramValidator,
} = require("./users.validator");

router.get("/users", getAllUsersController);
router.post("/users", createUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

module.exports = router;

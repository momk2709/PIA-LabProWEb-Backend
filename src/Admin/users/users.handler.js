const { prisma } = require("../../db/prisma");
const { UnauthorizedError, NotFoundError } = require("../../handlers/AppError");

const getAllUsers = async () => {
  const users = await prisma.usuario.findMany();
  return users;
};

module.exports = { getAllUsers };

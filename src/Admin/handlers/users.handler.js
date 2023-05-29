const { prisma } = require("../../db/prisma");

const getAllUsers = async () => {
  const users = await prisma.usuario.findMany();
  return users;
};

module.exports = { getAllUsers };
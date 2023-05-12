const { PrismaClient } = require("@prisma/client");
const { encrypt, verify } = require("./utils/bcrypt");
const prisma = new PrismaClient();
const USER_ROL = 2;
const register = async ({ nombre, email, password }) => {
  const hash = await encrypt(password);
  const user = await prisma.usuario.create({
    data: {
      rol_id: USER_ROL,
      nombre: nombre,
      email: email,
      password: hash,
    },
  });
  return user;
};
const login = async ({ email, password }) => {
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await verify(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
};
module.exports = { register, login };

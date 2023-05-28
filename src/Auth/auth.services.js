const { PrismaClient } = require("@prisma/client");
const { encrypt, verify } = require("./utils/bcrypt");
const { generateToken } = require("./utils/jwt");
const { UnauthorizedError, NotFoundError } = require("../handlers/AppError");
const prisma = new PrismaClient();
const USER_ROL = 2;
const register = async ({ nombre, email, password }) => {
  const userExists = await prisma.usuario.findFirst({
    where: {
      email,
    },
  });
  if (userExists) {
    throw UnauthorizedError.create("El usuario ya existe");
  }
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
    throw UnauthorizedError.create("Wrong credentials");
  }
  const isPasswordValid = await verify(password, user.password);
  if (!isPasswordValid) {
    throw UnauthorizedError.create("Wrong credentials");
  }
  const token = generateToken(user.id);

  return token;
};
const me = async (id) => {
  const user = await prisma.usuario.findUnique({
    where: { id },
    include: {
      Rol: true,
    },
  });
  if (!user) {
    throw NotFoundError.create("User not found");
  }
  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.Rol.nombre,
  };
};
module.exports = { register, login, me };

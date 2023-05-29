const { encrypt } = require("../../Auth/utils/bcrypt");
const { prisma } = require("../../db/prisma");
const { ForbiddenError, NotFoundError } = require("../../handlers/AppError");

const getAllUsers = async () => {
  const users = await prisma.usuario.findMany({
    include: {
      Rol: true,
    },
  });

  return users.map((user) => {
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.Rol.nombre,
    };
  });
};

const createUser = async ({ nombre, email, password, rol }) => {
  const isUser = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });

  if (isUser) throw ForbiddenError.create("User already exists");

  const isRol = await prisma.rol.findFirst({
    where: {
      nombre: rol,
    },
  });

  if (!isRol) throw NotFoundError.create("Rol not found");

  const hash = await encrypt(password);

  const user = await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hash,
      rol_id: isRol.id,
    },
  });

  return user;
};

const editUser = async (id, { nombre, email, password, rol }) => {
  const [isUser, userExists, isRol] = await prisma.$transaction([
    prisma.usuario.findUnique({
      where: {
        id,
      },
    }),
    prisma.usuario.findFirst({
      where: {
        email,
      },
    }),

    prisma.rol.findFirst({
      where: {
        nombre: rol,
      },
    }),
  ]);

  if (!isUser) throw NotFoundError.create("User not found");

  if (userExists && userExists.id !== id) {
    throw ForbiddenError.create("User already exists");
  }

  if (!isRol) throw NotFoundError.create("Rol not found");

  if (!password) {
    const updatedUser = await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nombre,
        email,
        rol_id: isRol.id,
      },
    });

    return updatedUser;
  }

  const hash = await encrypt(password);

  const updatedUser = await prisma.usuario.update({
    where: {
      id,
    },
    data: {
      nombre,
      email,
      password: hash,
      rol_id: isRol.id,
    },
  });

  return updatedUser;
};

const deleteUser = async (id) => {
  const isUser = await prisma.usuario.findUnique({
    where: {
      id,
    },
  });

  if (!isUser) throw NotFoundError.create("User not found");

  const deletedUser = await prisma.usuario.delete({
    where: {
      id,
    },
  });

  return deletedUser;
};

module.exports = { getAllUsers, createUser, editUser, deleteUser };

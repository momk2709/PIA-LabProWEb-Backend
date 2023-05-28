const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// function to check database connection

const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log("🟢 Database connected");
  } catch (error) {
    console.log("🔴 Database connection failed");
    console.error(error);
  }
};

module.exports = { checkConnection, prisma };

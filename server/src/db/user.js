const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByUsername = async username => {
  return prisma.user.findUnique({
    where: { username },
  });
};

const createUser = async userData => {
  return prisma.user.create({
    data: userData,
  });
};

const getUserById = async id => {
  return prisma.user.findUnique({
    where: { id },
  });
};

module.exports = { getUserByUsername, createUser, getUserById };

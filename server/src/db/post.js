const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPosts = async () => {
  return prisma.post.findMany({
    include: { user: true },
  });
};

const getPostById = async id => {
  return prisma.post.findUnique({
    where: { id },
    include: { user: true },
  });
};

const createPost = async postData => {
  return prisma.post.create({
    data: postData,
    // include: { user: true },
  });
};

const updatePost = async (id, postData, userId) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post.userId === userId) {
    return null;
  }
  return prisma.post.update({
    where: { id },
    data: {
      postData,
    },
  });
};

const deletePost = async (id, userId) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post.userId !== userId) {
    return null;
  }
  return prisma.post.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

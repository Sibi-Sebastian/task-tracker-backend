const prisma = require("../../database/prisma");

exports.createTask = (data) => {
  return prisma.task.create({ data });
};

exports.findTasksByUserId = (userId) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

exports.findById = (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

exports.updateTaskById = (id, data) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

exports.deleteById = (id) => {
  return prisma.task.delete({
    where: { id },
  });
};

exports.findTasksByUserPaginated = ({ userId, status, skip, take }) => {
  return prisma.task.findMany({
    where: {
      userId,
      ...(status && { status }),
    },
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
};


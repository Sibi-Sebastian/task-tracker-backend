const prisma = require("../../database/prisma");

exports.findAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

exports.findAllTasks = () => {
  return prisma.task.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

exports.getTaskStats = async () => {
  const total = await prisma.task.count();
  const completed = await prisma.task.count({
    where: { status: "DONE" },
  });
  const pending = await prisma.task.count({
    where: { status: { not: "DONE" } },
  });

  return {
    total,
    completed,
    pending,
  };
};

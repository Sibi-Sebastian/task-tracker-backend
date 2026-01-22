const taskRepository = require("./task.repository");

exports.createTask = async ({ title, description, userId }) => {
  if (!title || title.trim() === "") {
    const err = new Error("Title is required");
    err.statusCode = 400;
    throw err;
  }

  return taskRepository.createTask({
    title,
    description,
    userId, // ownership enforced here
  });
};

exports.getMyTasks = async (userId) => {
  return taskRepository.findTasksByUserId(userId);
};

exports.updateTask = async ({ taskId, title, description, userId }) => {
  const task = await taskRepository.findById(taskId);

  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  // 🔒 ownership check (VERY IMPORTANT)
  if (task.userId !== userId) {
    const err = new Error("Forbidden");
    err.statusCode = 403;
    throw err;
  }

  return taskRepository.updateTaskById(taskId, {
    title,
    description,
  });
};


exports.deleteTask = async ({ taskId, userId, role }) => {
  const task = await taskRepository.findById(taskId);

  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  // 🔑 USER ownership check
  if (role !== "ADMIN" && task.userId !== userId) {
    const err = new Error("Forbidden");
    err.statusCode = 403;
    throw err;
  }

  await taskRepository.deleteById(taskId);

  return { message: "Task deleted successfully" };
};

exports.getMyTasks = async ({ userId, page = 1, limit = 10, status }) => {
  const skip = (page - 1) * limit;

  return taskRepository.findTasksByUserPaginated({
    userId,
    status,
    skip,
    take: Number(limit),
  });
};

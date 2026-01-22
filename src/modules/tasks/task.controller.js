const taskService = require("./task.service");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await taskService.createTask({
      title,
      description,
      userId: req.user.userId, // 🔒 from token, not body
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getMyTasks(req.user.userId);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const updatedTask = await taskService.updateTask({
      taskId: req.params.id,
      title,
      description,
      userId: req.user.userId,
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask({
      taskId: req.params.id,
      userId: req.user.userId,
      role: req.user.role,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const { page, limit, status } = req.query;

    const tasks = await taskService.getMyTasks({
      userId: req.user.userId,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      status,
    });

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

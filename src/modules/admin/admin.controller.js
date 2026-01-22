const adminService = require("./admin.service");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await adminService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getTaskStats();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

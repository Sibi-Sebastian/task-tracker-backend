const adminRepository = require("./admin.repository");

exports.getAllUsers = async () => {
  return adminRepository.findAllUsers();
};

exports.getAllTasks = async () => {
  return adminRepository.findAllTasks();
};

exports.getTaskStats = async () => {
  return adminRepository.getTaskStats();
};

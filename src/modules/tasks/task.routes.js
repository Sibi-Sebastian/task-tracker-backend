const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware/auth.middleware");
const taskController = require("./task.controller");

router.post("/", authenticate, taskController.createTask);
router.get("/", authenticate, taskController.getMyTasks);
router.put("/:id", authenticate, taskController.updateTask);
router.delete("/:id", authenticate, taskController.deleteTask);

module.exports = router;

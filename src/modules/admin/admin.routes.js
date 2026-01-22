const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware/auth.middleware");
const { requireRole } = require("../../middleware/role.middleware");
const adminController = require("./admin.controller");

// 🔐 ADMIN ONLY
router.get("/users", authenticate, requireRole("ADMIN"), adminController.getUsers);
router.get("/tasks", authenticate, requireRole("ADMIN"), adminController.getTasks);
router.get("/stats", authenticate, requireRole("ADMIN"), adminController.getStats);

module.exports = router;

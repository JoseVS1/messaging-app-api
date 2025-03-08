const { Router } = require("express");
const userController = require("../controllers/userController");

const userRoutes = Router();

// Get users
userRoutes.get("/", userController.getAllUsers);

// Get user /:id
userRoutes.get("/:id", userController.getUser);

module.exports = userRoutes;
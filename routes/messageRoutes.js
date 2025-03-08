const { Router } = require("express");
const messageController = require("../controllers/messageController");
const passport = require("passport");

const messageRoutes = Router();

// Create message /
messageRoutes.post("/", passport.authenticate("jwt", {session: false}), messageController.postCreateMessage);

// Get all messages (filtered by sender/receiver)
messageRoutes.get("/", passport.authenticate("jwt", {session: false}), messageController.getMessages);

// // Get specific message /:id MAYBE NOT NECESSARY
// messageRoutes.get("/:id", messageContro)

module.exports = messageRoutes;
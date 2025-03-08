const { Router } = require("express");
const profileController = require("../controllers/profileController");
const passport = require("passport");

const profileRoutes = Router();

// Get user profile /:userId
profileRoutes.get("/:id", profileController.getUserProfile);

// Update user profile /:userId
profileRoutes.put("/:id", passport.authenticate("jwt", {session: false}), profileController.putUpdateUserProfile);

module.exports = profileRoutes;
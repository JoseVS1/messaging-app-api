const { Router } = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");

const authRoutes = Router();

// Sign up
authRoutes.post("/signup", authController.postSignup);

// Log in
authRoutes.post("/login", authController.postLogin);

// Log out
authRoutes.get("/logout", passport.authenticate("jwt", {session: false}), authController.getLogout);

// Get logged in user's details /me
authRoutes.get("/me", passport.authenticate("jwt", {session: false}), authController.getMe);

module.exports = authRoutes;
const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");
const limiter = require("../Middleware/limiter");
const { verifySession } = require("../Middleware/verifySession");

router.route("/signup").post(limiter, authController.signup);
router.route("/login").post(limiter, authController.login);
router.route("/logout").post(limiter, authController.logout);
router.route("/verify").post(limiter, authController.verify);
router.route("/currentUser").get(authController.getCurrentUser);
router.route("/forgotPassword").post(limiter, authController.forgotPassword);
router.route("/resetPassword").post(limiter, authController.resetPassword);
router.route("/validateResetLink").post(authController.validateResetLink);

module.exports = router;
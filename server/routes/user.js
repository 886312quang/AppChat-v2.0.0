const express = require("express");

const { user } = require("../controllers/index");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.param("userId", user.load);

// Get current user
router.route("/current").get(AuthMiddleware.isAuth, user.getCurrentUser);

module.exports = router;

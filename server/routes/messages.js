const express = require("express");
const { messages } = require("../controllers/index");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/read-more-all-chat").get(AuthMiddleware.isAuth, messages.readMoreAllChat);

module.exports = router;

const express = require("express");
const validate = require("express-validator");
const { contact } = require("../controllers/index");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/").get(AuthMiddleware.isAuth, contact.list);

module.exports = router;

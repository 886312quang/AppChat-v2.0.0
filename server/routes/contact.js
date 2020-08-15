const express = require("express");
const validate = require("express-validator");
const { contact } = require("../controllers/index");
const AuthMiddleware = require("../middleware/auth");
const { contactValid } = require("../validation/index");

const router = express.Router();

router.route("/").get(AuthMiddleware.isAuth, contact.list);
// Find user
router
  .route("/find-users/:keyword")
  .get(AuthMiddleware.isAuth, contactValid.findUsers, contact.findUsersContact);

module.exports = router;

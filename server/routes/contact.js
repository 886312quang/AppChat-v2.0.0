const express = require("express");
const validate = require("express-validator");
const { contact } = require("../controllers/index");
const AuthMiddleware = require("../middleware/auth");
const { contactValid } = require("../validation/index");

const router = express.Router();

router.route("/").get(AuthMiddleware.isAuth, contact.getContacts);
// Find user
router
  .route("/find-users/:keyword")
  .get(AuthMiddleware.isAuth, contactValid.findUsers, contact.findUsersContact);
router.route("/create").post(AuthMiddleware.isAuth, contact.createContact);
router
  .route("/remove-request-sent/:id")
  .delete(AuthMiddleware.isAuth, contact.removeRequestContactSent);

module.exports = router;

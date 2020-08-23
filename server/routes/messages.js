const express = require("express");
const { messages } = require("../controllers/index");
const AuthMiddleware = require("../middleware/auth");
const { messageValid } = require("../validation/index");

const router = express.Router();

router
  .route("/read-more-all-chat")
  .get(AuthMiddleware.isAuth, messages.readMoreAllChat);
router
  .route("/")
  .post(
    AuthMiddleware.isAuth,
    //messageValid.checkMessageLength,
    messages.creatNewMessage,
  );

module.exports = router;

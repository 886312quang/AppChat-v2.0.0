const express = require("express");

const { user } = require("../controllers/index");
const { userValid } = require("../validation/index");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.param("userId", user.load);

// Get current user
router.route("/current").get(AuthMiddleware.isAuth, user.getCurrentUser);
router
  .route("/updatePassword")
  .put(AuthMiddleware.isAuth, userValid.updatePassword, user.updatePassword);
router
  .route("/")
  .put(AuthMiddleware.isAuth, userValid.updateInfo, user.updateInfo);

module.exports = router;

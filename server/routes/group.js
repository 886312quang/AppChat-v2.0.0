const express = require("express");
const AuthMiddleware = require("../middleware/auth");
const { group } = require("../controllers/index");
const { contactValid } = require("../validation/index");

const router = express.Router();

router.route("/add-new").post(AuthMiddleware.isAuth, group.addNew);

module.exports = router;

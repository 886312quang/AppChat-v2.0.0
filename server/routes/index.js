const express = require("express");

// Routes
const auth = require("./auth");
const user = require("./user");
const contact = require("./contact");
const messages = require("./messages");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", auth);
router.use("/user", user);
router.use("/contact", contact);
router.use("/message", messages);

module.exports = router;

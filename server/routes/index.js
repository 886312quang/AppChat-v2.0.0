const express = require("express");

// Routes
const auth = require("./auth");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", auth);

module.exports = router;

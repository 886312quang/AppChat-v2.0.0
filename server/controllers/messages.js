const multer = require("multer");
const { app } = require("../config/app");
const { transErrors, transSuccess } = require("../../lang/vi");
const { validationResult } = require("express-validator/check");
const { message } = require("../services/index");
const fsExtra = require("fs-extra");

let readMoreAllChat = async (req, res) => {
  try {
    // Get Skip number from query params
    let skipPersonal = +req.query.skipPersonal;
    let skipGroup = +req.query.skipGroup;

    // Read More Contact
    let newAllConversation = await message.readMoreAllChat(
      req.user._id,
      skipPersonal,
      skipGroup,
    );
    return res.status(200).json(newAllConversation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  readMoreAllChat,
};

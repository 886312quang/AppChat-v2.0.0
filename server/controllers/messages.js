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

let creatNewMessage = async (req, res) => {
  let errorArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });

    return res.status(500).send(errorArr);
  }
  try {
    let sender = {
      id: req.user._id,
      name: req.user.userName,
      avatar: req.user.avatar,
    };

    let receiveId = req.body.receiverId;
    let messageVal = req.body.message;
    let isChatGroup = req.body.isChatGroup;

    let newMessage = await message.addNewTextEmoji(
      sender,
      receiveId,
      messageVal,
      isChatGroup,
    );
    return res.status(200).send({ message: newMessage });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  readMoreAllChat,
  creatNewMessage,
};

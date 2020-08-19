const { validationResult } = require("express-validator/check");
const UserModel = require("../models/userModel");
const { transSuccess, transErrors } = require("../../lang/vi");
const { user } = require("../services/index");

let load = async (req, res, next, id) => {
  try {
    const user = await UserModel.get(id);
    console.log(user);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

let getCurrentUser = async (req, res) => {
  const user = await UserModel.getNormalUserDataById(req.user._id);

  return res.status(200).json(user);
};

let updatePassword = async (req, res) => {
  let errorArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });
    return res.status(500).json({ message: errorArr });
  }

  try {
    let updateUserItem = req.body;
    await user.updatePassword(req.user._id, updateUserItem);

    let result = {
      message: transSuccess.updatedPassword,
    };
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

let updateInfo = async (req, res) => {
  let errorArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });
    return res.status(500).send({message: errorArr});
  }
  try {
    let updateUserItem = req.body;
    await user.updateUser(req.user._id, updateUserItem);
    let result = {
      message: transSuccess.updatedUserInfo,
    };
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getCurrentUser,
  load,
  updatePassword,
  updateInfo,
};

const { validationResult } = require("express-validator/check");
const UserModel = require("../models/userModel");
const { transSuccess, transErrors } = require("../../lang/vi");

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

module.exports = {
  getCurrentUser,
  load,
};

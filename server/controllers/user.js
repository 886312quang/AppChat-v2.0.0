const { validationResult } = require("express-validator/check");
const UserModel = require("../models/userModel");
const { transSuccess, transErrors } = require("../../lang/vi");
const { user } = require("../services/index");
const multer = require("multer");
const fsExtra = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const app = require("../config/app");

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
    return res.status(500).send({ message: errorArr });
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

// Update Avatar
let storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directory);
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type;
    if (math.indexOf(file.mimetype) === -1) {
      return callback(transErrors.avatar_type_errors);
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, avatarName);
  },
});

let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: app.avatar_limit_size },
}).single("avatar");

let updateAvatar = (req, res) => {
  avatarUploadFile(req, res, async (error) => {
    if (error) {
      console.log(error);
      if (error.message) {
        return res.status(500).send(transErrors.avatar_size_errors);
      }
      return res.status(500).send(error);
    }
    try {
      let updateUserItem = {
        avatar: req.file.filename,
        updatedAt: Date.now(),
      };

      let userUpdate = await user.updateUser(req.user._id, updateUserItem);

      // Remove old user
      if (userUpdate.avatar !== "avatar-default.jpg") {
        await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`);
      }

      let result = {
        message: transSuccess.updatedUserInfo,
        imageSrc: `/image/users/${req.file.filename}`,
      };

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
};

module.exports = {
  getCurrentUser,
  load,
  updatePassword,
  updateInfo,
  updateAvatar,
};

const { validationResult } = require("express-validator/check");
const ContactModel = require("../models/contactModel");
const { transSuccess, transErrors } = require("../../lang/vi");
const { contact } = require("../services/index");

let list = async (req, res, next) => {
  try {
    let currentUserId = req.user._id;
    console.log(currentUserId);
    // Get Types
    const type = ["request", "contact", "requestsent"].includes(
      req.query.type.toLowerCase(),
    )
      ? req.query.type.toLowerCase()
      : "contact";
    // Get options GET LIST
    let options = {};
    if (type === "request") {
      options = {
        $and: [{ status: false }, { contactId: currentUserId }],
      };
    } else if (type === "requestsent") {
      options = {
        $and: [{ status: false }, { userId: currentUserId }],
      };
    } else {
      options = {
        $and: [
          {
            $or: [{ contactId: currentUserId }, { userId: currentUserId }],
          },
          { status: true },
        ],
      };
    }

    let contacts = await ContactModel.find(options)
      .populate("userId", "id userName avatar createdAt")
      .populate("contactId", "id userName avatar createdAt");
    console.log(contacts);

    let responseList = [];

    contacts.forEach((contact) => {
      if (contact.userId.id == currentUserId) {
        responseList.push(contact.contactId);
      } else if (contact.contactId.id == currentUserId) {
        responseList.push(contact.userId);
      }
    });

    console.log(responseList);
    return res.status(200).json(responseList);
  } catch (error) {
    next(error);
  }
};

let findUsersContact = async (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });
    return res.status(500).send(errorArr);
  }

  try {
    let currentUserId = req.user._id;
    let keyword = req.params.keyword;
    let users = await contact.findUsersContact(currentUserId, keyword);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  list,
  findUsersContact,
};

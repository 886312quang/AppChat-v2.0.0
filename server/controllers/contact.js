const ContactModel = require("../models/contactModel");
const { transSuccess, transErrors } = require("../../lang/vi");
const { contacts } = require("../services/index");

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

module.exports = {
  list,
};

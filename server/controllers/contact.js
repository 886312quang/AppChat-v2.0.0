const { validationResult } = require("express-validator/check");
const ContactModel = require("../models/contactModel");
const UserModel = require("../models/userModel");
const { transSuccess, transErrors } = require("../../lang/vi");
const { contact } = require("../services/index");

/* let list = async (req, res, next) => {
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
}; */

let getContacts = async (req, res, next) => {
  try {
    let currentUserId = req.user._id;

    // Contact
    const contacts = await contact.getContacts(currentUserId);
    const requests = await contact.getContactsReceived(currentUserId);
    const requestsSent = await contact.getContactsSent(currentUserId);

    // Count
    const countContact = await contact.countAllContacts(currentUserId);
    const countRequest = await contact.countAllContactsSent(currentUserId);
    const countReceived = await contact.countAllContactsReceived(currentUserId);

    return res.status(200).json({
      contacts,
      requests,
      requestsSent,
      countContact,
      countReceived,
      countRequest,
    });
  } catch (error) {
    return next(error);
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

let createContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
  
    let contactId = req.body._id;
    let userContact;

    let newContact = await contact.addNew(currentUserId, contactId);
    if (newContact) {
      userContact = await UserModel.getNormalUserDataById(contactId);
    }

    return res.status(200).json(userContact); // return true or false with !!newContact
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeRequestContactSent = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.params.id;

    await contact.removeRequestContactSent(
      currentUserId,
      contactId,
    );
    return res.status(200).send({ contactId }); // return true or false with !!newContact
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getContacts,
  findUsersContact,
  createContact,
  removeRequestContactSent,
};

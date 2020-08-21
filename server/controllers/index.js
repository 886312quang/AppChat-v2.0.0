const authControllers = require("./auth");
const userControllers = require("./user");
const contactControllers = require("./contact");
const messageControllers = require("./messages");

const auth = authControllers;
const user = userControllers;
const contact = contactControllers;
const messages = messageControllers;

module.exports = {
  auth,
  user,
  contact,
  messages,
};

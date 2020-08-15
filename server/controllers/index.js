const authControllers = require("./auth");
const userControllers = require("./user");
const contactControllers = require("./contact");

const auth = authControllers;
const user = userControllers;
const contact = contactControllers;

module.exports = {
  auth,
  user,
  contact,
};

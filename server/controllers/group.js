const { group } = require("../services/index");
const { validationResult } = require("express-validator/check");

let addNew = async (req, res) => {
  let errorArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });
    console.log(errorArr);
    return res.status(500).send(errorArr);
  }
  try {
    let members = req.body.members;
    let captionId = req.user._id;
    members.push({ userId: captionId });
    let name = req.body.name;

    let newGroup = await group.addNew(captionId, members, name);

    return res.status(200).send(newGroup); // return true or false with !!newContact
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  addNew: addNew,
};

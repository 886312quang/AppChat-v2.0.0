const { emitNotifyToArray } = require("../../helpers/socketHelper");

let createGroup = (io, data, clients, user) => {
  let response = {
    data,
  };

  data.members.forEach((member) => {
    if (clients[member.userId] && member.userId != user._id) {
      emitNotifyToArray(
        clients,
        member.userId,
        io,
        "response-new-group-created",
        response,
      );
    }
  });
};

module.exports = createGroup;

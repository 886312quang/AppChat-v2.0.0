const { emitNotifyToArray } = require("../../helpers/socketHelper");

let sentMessage = (io, data, clients, user) => {
  if (data.conversationType === "personal") {
    if (data.receiverId) {
      let response = data;
      if (clients[data.receiverId]) {
        emitNotifyToArray(
          clients,
          data.receiverId,
          io,
          "response-sent-message",
          response,
        );
      }
    }
  }
};

module.exports = sentMessage;

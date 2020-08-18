const {
  pushSocketIdToArry,
  emitNotifyToArray,
  removeSocketIdFromArray,
} = require("../../helpers/socketHelper");
/**
 * @param io from socket.io lib
 */
let acceptRequestContactReceived = (io, clients) => {
  socket.on("accept-request-contact-received", (data) => {
    let currentUser = {
      id: socket.request.user._id,
      userName: socket.request.user.userName,
      avatar: socket.request.user.avatar,
      address:
        socket.request.user.address !== null ? socket.request.user.address : "",
    };
    // Id cua thang duoc gui
    if (clients[data.contactId]) {
      emitNotifyToArray(
        clients,
        data.contactId,
        io,
        "response-accept-request-contact-received",
        currentUser,
      );
    }
  });
};

module.exports = acceptRequestContactReceived;

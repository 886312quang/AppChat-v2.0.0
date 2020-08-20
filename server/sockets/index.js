const socketioJwt = require("socketio-jwt");
const {
  pushSocketIdToArry,
  removeSocketIdFromArray,
} = require("../helpers/socketHelper");
const getCurrentUserInfo = require("../helpers/getCurrentUserInfo");
const acceptRequestContactReceived = require("./contact/acceptRequestContactReceived");
const addContact = require("./contact/addContact");
const removeRequestContactReceived = require("./contact/removeRequestContactReceived");
const removeRequestContactSent = require("./contact/removeRequestContactSent");
const removeContact = require("./contact/removeContact");
const checkStatus = require("./status/checkStatus");

let initSockets = (io) => {
  io.use(
    socketioJwt.authorize({
      secret: process.env.ACCESS_TOKEN_SECRET,
      /*  "process.env.ACCESS_TOKEN_SECRET_MQ_9999" ||
        process.env.REFRESH_TOKEN_SECRET, */
      handshake: true,
    }),
  );
  //Reload will listen
  let clients = {};
  //Connection
  io.on("connection", async (socket) => {
    try {
      const user = await getCurrentUserInfo(socket.decoded_token.data._id);
      if (user) {
        clients = pushSocketIdToArry(
          clients,
          socket.decoded_token.data._id,
          socket.id,
        );
      }
      console.log(clients);
      // Config Socket

      // Check Status
      socket.on("check-status", () => {
        checkStatus(socket, clients, user);
      });
      // Contact
      socket.on("add-contact", (data) => {
        addContact(io, data, clients, user);
      });
      socket.on("accept-request-contact-received", (data) => {
        acceptRequestContactReceived(io, data, clients, user);
      });
      socket.on("remove-request-contact-received", (data) => {
        removeRequestContactReceived(io, data, clients, user);
      });
      socket.on("remove-request-sent-contact", (data) => {
        removeRequestContactSent(io, data, clients, user);
      });
      socket.on("remove-contact", (data) => {
        removeContact(io, data, clients, user);
      });

      //Disconnect socket
      socket.on("disconnect", () => {
        clients = removeSocketIdFromArray(
          clients,
          socket.decoded_token.data._id,
          socket,
        );
        //Step 99 Emit to all another user when has user offline
        socket.broadcast.emit("server-send-when-new-user-offline", user._id);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = initSockets;

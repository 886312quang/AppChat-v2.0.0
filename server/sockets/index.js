const socketioJwt = require("socketio-jwt");
const {
  pushSocketIdToArry,
  removeSocketIdFromArray,
} = require("../helpers/socketHelper");
const getCurrentUserInfo = require("../helpers/getCurrentUserInfo");
const getChatGroupIds = require("../helpers/getChatGroupIds");
const acceptRequestContactReceived = require("./contact/acceptRequestContactReceived");
const addContact = require("./contact/addContact");
const removeRequestContactReceived = require("./contact/removeRequestContactReceived");
const removeRequestContactSent = require("./contact/removeRequestContactSent");
const removeContact = require("./contact/removeContact");
const checkStatus = require("./status/checkStatus");
const sentMessage = require("./chat/sentMessage");
const typingOn = require("./chat/typingOn");
const typingOff = require("./chat/typingOff");
const createGroup = require("./chat/createGroup");

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
  let newGroupChatId = "";

  //Connection
  io.on("connection", async (socket) => {
    try {
      const user = await getCurrentUserInfo(socket.decoded_token.data._id);
      let chatGroupIds = await getChatGroupIds(user._id);
      if (user) {
        clients = pushSocketIdToArry(
          clients,
          socket.decoded_token.data._id,
          socket.id,
        );
      }
      if (chatGroupIds) {
        chatGroupIds.forEach((group) => {
          clients = pushSocketIdToArry(clients, group._id, socket.id);
        });
      }

      // New Group Chat
      socket.on("create-new-group", (data) => {
        clients = pushSocketIdToArry(clients, data._id, socket.id);
        console.log(clients);
        createGroup(io, data, clients, user);
      });

      socket.on("member-received-group-chat", (data) => {
        newGroupChatId = data.groupChatId;
        clients = pushSocketIdToArry(clients, data.groupChatId, socket.id);
        console.log("received")
        console.log(clients)
      });

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
      socket.on("sent-message", (data) => {
        sentMessage(io, data, clients, user);
      });
      socket.on("typing-on", (data) => typingOn(io, data, clients, user));
      socket.on("typing-off", (data) => typingOff(io, data, clients, user));
      socket.on("create-group", (data) => createGroup(io, data, clients, user));

      //Disconnect socket
      socket.on("disconnect", () => {
        clients = removeSocketIdFromArray(
          clients,
          socket.decoded_token.data._id,
          socket,
        );
        if (newGroupChatId) {
          clients = removeSocketIdFromArray(clients, newGroupChatId, socket);
        }
        chatGroupIds.forEach((group) => {
          clients = removeSocketIdFromArray(clients, group._id, socket);
        });
        //Step 99 Emit to all another user when has user offline
        socket.broadcast.emit("server-send-when-new-user-offline", user._id);
        console.log("disconnect");
        console.log(clients);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = initSockets;

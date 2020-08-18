const socketioJwt = require("socketio-jwt");
const {
  pushSocketIdToArry,
  removeSocketIdFromArray,
} = require("../helpers/socketHelper");
const acceptRequestContactReceived = require("./contact/acceptRequestContactReceived");

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
  io.on("connection", (socket) => {
    try {
      clients = pushSocketIdToArry(
        clients,
        socket.decoded_token.data._id,
        socket.id,
      );
      console.log(clients);

      //Disconnect socket
      socket.on("disconnect", () => {
        clients = removeSocketIdFromArray(
          clients,
          socket.decoded_token.data._id,
          socket,
        );
        console.log("disconnect");
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = initSockets;

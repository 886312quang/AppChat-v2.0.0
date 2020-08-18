import io from "socket.io-client";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;

let socket = null;

const onConnected = () => {
  console.log("socket: connected");
};

const onDisconnect = () => {
  console.log("socket: disconnect");
};

export const configSocket = () => {
  if (socket && socket.disconnected) {
    socket.connect();
  }
  if (socket) return;

  socket = io.connect(endpoint, {
    path: "/chat/socket.io",
    query: `token=${isAuthenticated()}`,
  });

  console.log(socket);
  socket.on("connect", onConnected);
  socket.on("disconnect", onDisconnect);

  return socket;
};

export const socketDisconnect = () => {
  socket.disconnect();
};

export default function getSocket() {
  return socket;
}

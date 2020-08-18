import io from "socket.io-client";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";
import {
  onAddContact,
  onAcceptRequestContact,
  onRemoveRequestContact,
  onRemoveRequestSentContact,
  onRemoveContact,
} from "./contact";

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;

let socket = null;

const onConnected = () => {};

const onDisconnect = () => {};

export const configSocket = () => {
  if (socket && socket.disconnected) {
    socket.connect();
  }
  if (socket) return;

  socket = io.connect(endpoint, {
    path: "/chat/socket.io",
    query: `token=${isAuthenticated()}`,
  });

  socket.on("connect", onConnected);
  socket.on("disconnect", onDisconnect);

  // Contact
  socket.on("response-add-contact", onAddContact);
  socket.on("response-accept-request-contact-received", onAcceptRequestContact);
  socket.on("response-remove-request-contact-received", onRemoveRequestContact);
  socket.on("response-remove-request-sent-contact", onRemoveRequestSentContact);
  socket.on("response-remove-contact", onRemoveContact);

  return socket;
};

export const socketDisconnect = () => {
  socket.disconnect();
};

export default function getSocket() {
  return socket;
}

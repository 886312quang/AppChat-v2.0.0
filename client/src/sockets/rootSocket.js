import io from "socket.io-client";

import {
  onAddContact,
  onAcceptRequestContact,
  onRemoveRequestContact,
  onRemoveRequestSentContact,
  onRemoveContact,
} from "./contact";
import {
  onListUserOnline,
  onNewUserOnline,
  onNewUserOffline,
} from "./checkStatus";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";
import { onSentMessage, onTypingOn, onTypingOff, onDisconnect } from "./chat";

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;

let socket = null;

const onConnected = () => {};

export const configSocket = () => {
  if (socket && socket.disconnected) {
    socket.connect();
  }
  if (socket) return;
  socket = io.connect(endpoint, {
    path: "/chat/socket.io",
    query: `token=${isAuthenticated()}`,
  });
  if (socket) {
    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnect);

    // Contact
    socket.on("response-add-contact", onAddContact);
    socket.on(
      "response-accept-request-contact-received",
      onAcceptRequestContact,
    );
    socket.on(
      "response-remove-request-contact-received",
      onRemoveRequestContact,
    );
    socket.on(
      "response-remove-request-sent-contact",
      onRemoveRequestSentContact,
    );
    socket.on("response-remove-contact", onRemoveContact);
    socket.on("server-send-list-users-online", onListUserOnline);
    socket.on("server-send-when-new-user-online", onNewUserOnline);
    socket.on("server-send-when-new-user-offline", onNewUserOffline);
    socket.on("response-sent-message", onSentMessage);
    socket.on("response-typing-on", onTypingOn);
    socket.on("response-typing-off", onTypingOff);

    return socket;
  } else {
    return;
  }
};

export const socketDisconnect = () => {
  socket.disconnect();
  socket = null;
};

export default function getSocket() {
  return socket;
}

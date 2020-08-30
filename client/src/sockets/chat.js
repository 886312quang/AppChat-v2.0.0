import getSocket from "./rootSocket";
import constants from "../constants/message";
import getStore from "../configs/configureStore";

export const emitCreateGroup = (payload) => {
  getSocket().emit("create-new-group", payload);
};

export const onCreateGroup = (payload) => {
  const messages = payload.data;
  getStore().dispatch({
    type: constants.ON_CREATE_GROUP_SUCCESS,
    payload: messages,
  });
  getSocket().emit("member-received-group-chat", { groupChatId: messages._id });
};

export const emitSentMessage = (payload) => {
  getSocket().emit("sent-message", payload);
};

export const onSentMessage = (payload) => {
  getStore().dispatch({ type: constants.SOCKET_SENT_MESSAGE, payload });
};

export const emitTypingOn = (payload) => {
  getSocket().emit("typing-on", payload);
};

export const onTypingOn = (payload) => {
  getStore().dispatch({
    type: constants.SOCKET_TYPING_ON,
    payload: payload,
  });
};

export const emitTypingOff = (payload) => {
  getSocket().emit("typing-off", payload);
};

export const onTypingOff = (payload) => {
  getStore().dispatch({
    type: constants.SOCKET_TYPING_OFF,
    payload: payload,
  });
};

export const onDisconnect = () => {
  getStore().dispatch({
    type: constants.ON_DISCONNECT,
  });
};

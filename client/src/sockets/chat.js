import getSocket from "./rootSocket";
import constants from "../constants/message";
import getStore from "../configs/configureStore";

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

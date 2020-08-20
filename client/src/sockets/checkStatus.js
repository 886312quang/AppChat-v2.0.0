import getSocket from "./rootSocket";
import message from "../components/Shared/message";
import playBell from "../components/Shared/sound/bell";
import * as constant from "../constants/contact";
import getStore from "../configs/configureStore";

export const emitCheckStatus = () => {
  getSocket().emit("check-status");
};

export const onListUserOnline = (payload) => {
  getStore().dispatch({ type: constant.LIST_USER_ONLINE, payload });
};

export const onNewUserOnline = (payload) => {
  getStore().dispatch({ type: constant.NEW_USER_ONLINE, payload });
};

export const onNewUserOffline = (payload) => {
  getStore().dispatch({ type: constant.NEW_USER_OFFLINE, payload });
};

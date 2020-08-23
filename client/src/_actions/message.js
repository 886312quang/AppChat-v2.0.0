import constants from "../constants/message";
import getStore, { getHistory } from "../configs/configureStore";
import services from "../services/messages";
import Errors from "../components/Shared/error/errors";
import Message from "../components/Shared/message";
//import services from "../services/user";

const actions = {
  list: (data) => async (dispatch) => {
    try {
      dispatch({ type: constants.CHAT_GET_START });

      let groupSkip = data && data.groupSkip ? data.groupSkip : 0;
      let personSkip = data && data.personSkip ? data.personSkip : 0;
      let response = await services.getList({ groupSkip, personSkip });

      dispatch({
        type: constants.CHAT_GET_SUCCESS,
        payload: {
          messages: response.data,
          skip: groupSkip + personSkip,
        },
      });
    } catch (error) {
      Message.error("Get message fail!");
      dispatch({
        type: constants.CHAT_GET_ERROR,
      });
      getHistory().push("/");
    }
  },
  doCreate: (data) => async (dispatch) => {
    try {
      dispatch({ type: constants.CHAT_CREATE_START });

      const response = await services.createNewMessage(data);

      let state = getStore().getState();
      let currentUser = state.user.currentUser;

      dispatch({
        type: constants.CHAT_CREATE_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      Message.error("Send message fail!");
      dispatch({
        type: constants.CHAT_CREATE_ERROR,
      });
    }
  },
};

export default actions;

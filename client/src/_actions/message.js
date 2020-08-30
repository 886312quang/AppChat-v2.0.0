import constants from "../constants/message";
import getStore, { getHistory } from "../configs/configureStore";
import services from "../services/messages";
import Errors from "../components/Shared/error/errors";
import Message from "../components/Shared/message";
import { emitSentMessage, emitCreateGroup } from "../sockets/chat";
//import services from "../services/user";
import layoutActions from "../_actions/layout";

const actions = {
  doToggleScrollToBottom: () => ({
    type: constants.CHAT_SCROLL_TO_BOTTOM_TOGGLE,
  }),
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

      if (response.data.message) {
        dispatch({
          type: constants.CHAT_CREATE_SUCCESS,
          payload: response.data.message,
        });
        emitSentMessage(response.data.message);
      }
    } catch (error) {
      Message.error("Send message fail!");
      dispatch({
        type: constants.CHAT_CREATE_ERROR,
      });
    }
  },
  doCreateImages: (data) => async (dispatch) => {
    try {
      dispatch({ type: constants.CHAT_CREATE_START });

      const response = await services.createNewMessageImages(data);

      if (response.data.message) {
        dispatch({
          type: constants.CHAT_CREATE_SUCCESS,
          payload: response.data.message,
        });
        emitSentMessage(response.data.message);
      }
    } catch (error) {
      Message.error("Send message fail!");
      dispatch({
        type: constants.CHAT_CREATE_ERROR,
      });
    }
  },
  doCreateFiles: (data) => async (dispatch) => {
    try {
      dispatch({ type: constants.CHAT_CREATE_START });

      const response = await services.createNewMessageFiles(data);

      if (response.data.message) {
        dispatch({
          type: constants.CHAT_CREATE_SUCCESS,
          payload: response.data.message,
        });
        emitSentMessage(response.data.message);
      }
    } catch (error) {
      Message.error("Send message fail!");
      dispatch({
        type: constants.CHAT_CREATE_ERROR,
      });
    }
  },
  doDeleteList: (data) => async () => {
    const response = await services.deleteList(data);
    return response;
  },
  listImage: (data) => async (dispatch) => {
    try {
      dispatch({
        type: constants.CHAT_GET_IMAGE_LIST_START,
      });

      const response = await services.listImageFn(data);

      dispatch({
        type: constants.CHAT_GET_IMAGE_LIST_SUCCESS,
        payload: {
          images: response.data,
          skip: data.skip,
        },
      });
    } catch (error) {
      Message.error("Get list Image fail!");
      dispatch({
        type: constants.CHAT_GET_IMAGE_LIST_ERROR,
      });
    }
  },
  listFile: (data) => async (dispatch) => {
    try {
      dispatch({
        type: constants.CHAT_GET_FILE_LIST_START,
      });

      const response = await services.listFileFn(data);

      dispatch({
        type: constants.CHAT_GET_FILE_LIST_SUCCESS,
        payload: {
          files: response.data,
          skip: data.skip,
        },
      });
    } catch (error) {
      Message.error("Get list File fail!");
      dispatch({
        type: constants.CHAT_GET_FILE_LIST_ERROR,
      });
    }
  },
  readMore: (id, skip = 0, limit = 30) => async (dispatch) => {
    try {
      if (!id) {
        return;
      }
      dispatch({
        type: constants.READ_MORE_START,
      });

      const response = await services.readMore({ id, skip, limit });

      dispatch({
        type: constants.READ_MORE_SUCCESS,
        payload: { data: response.data, skip },
      });
      dispatch(layoutActions.doHideLeftSidebar());
    } catch (error) {
      Message.error("Read more message fail!");
      dispatch({
        type: constants.READ_MORE_ERROR,
      });
    }
  },
  doCreateGroup: (data) => async (dispatch) => {
    try {
      dispatch({
        type: constants.CHAT_CREATE_GROUP_START,
      });

      const response = await services.createGroup(data);
      let messages = response.data;

      console.log(messages);

      emitCreateGroup(messages);

      dispatch({
        type: constants.CHAT_CREATE_GROUP_SUCCESS,
        payload: messages,
      });

      getHistory().push(`/m/${response.data._id}`);
    } catch (error) {
      Message.error("Create group fail!");
      dispatch({
        type: constants.CHAT_CREATE_GROUP_ERROR,
      });
    }
  },
};

export default actions;

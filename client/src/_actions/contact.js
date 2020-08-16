import * as constants from "../constants/contact";
import * as userConstants from "../constants/user";
import Errors from "../components/Shared/error/errors";
import services from "../services/contact";
import Message from "../components/Shared/message";

const actions = {
  getContacts: () => async (dispatch) => {
    try {
      dispatch({ type: constants.CONTACT_GET_START });

      let response = await services.getContacts();

      dispatch({ type: constants.CONTACT_GET_SUCCESS, payload: response.data });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: constants.CONTACT_GET_ERROR });
    }
  },
  listRequest: () => async (dispatch) => {
    try {
      dispatch({ type: constants.REQUEST_GET_START });

      let response = await services.getListFriend({ type: "request" });

      dispatch({ type: constants.REQUEST_GET_SUCCESS, payload: response.data });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: constants.REQUEST_GET_ERROR });
    }
  },
  listRequestsSent: () => async (dispatch) => {
    try {
      dispatch({ type: constants.REQUEST_SENT_GET_START });

      let response = await services.getListFriend({ type: "requestsent" });

      dispatch({
        type: constants.REQUEST_SENT_GET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: constants.REQUEST_SENT_GET_ERROR });
    }
  },
  findUserContacts: (filter) => async (dispatch) => {
    try {
      dispatch({ type: userConstants.USER_GET_START });

      let response = await services.findUserContacts(filter);

      dispatch({
        type: userConstants.USER_GET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Message.error("Error find user!");
      dispatch({ type: userConstants.USER_GET_ERROR });
    }
  },
  doCreate: (userInfo) => async (dispatch) => {
    try {
      dispatch({ type: constants.CONTACT_CREATE_START });

      const response = await services.createContact(userInfo);

      dispatch({
        type: constants.CONTACT_CREATE_SUCCESS,
        payload: response.data,
      });
      Message.success("Add friend success");
    } catch (error) {
      Message.error("Add friend fail");
      dispatch({
        type: userConstants.USER_ADD_CONTACT_ERROR,
      });
    }
  },
  removeSentRequestContact: (id) => async (dispatch) => {
    try {
      dispatch({ type: constants.CONTACT_REMOVE_SENT_START });

      const response = await services.removeRequestSent(id);

      dispatch({
        type: constants.CONTACT_REMOVE_SENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Message.error("Error");
      dispatch({
        type: constants.CONTACT_REMOVE_SENT_ERROR,
      });
    }
  },
};

export default actions;

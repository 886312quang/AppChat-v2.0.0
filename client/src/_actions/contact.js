import * as constants from "../constants/contact";
import * as userConstants from "../constants/user";
import Errors from "../components/Shared/error/errors";
import services from "../services/contact";

const actions = {
  listContacts: () => async (dispatch) => {
    try {
      dispatch({ type: constants.CONTACT_GET_START });

      let response = await services.getListFriend({ type: "contact" });

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
};

export default actions;

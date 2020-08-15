import * as constants from "../constants/user";
import Message from "../components/Shared/message";
import Errors from "../components/Shared/error/errors";
import services from "../services/user";

const actions = {
  getCurrentUser: () => async (dispatch) => {
    try {
      dispatch({
        type: constants.USER_GET_CURRENT_START,
      });

      let response = await services.getCurrentUser();
      
      dispatch({
        type: constants.USER_GET_CURRENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: constants.USER_GET_CURRENT_ERROR,
      });
    }
  },
  list: (filter = {}) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_GET_START });

      let response = await services.listFriend(filter);

      dispatch({
        type: constants.USER_GET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: constants.USER_GET_ERROR });
    }
  },
};

export default actions;

import * as constants from "../constants/user";
import produce from "immer";
import { constant } from "lodash";

const initialState = {
  initLoading: true,
  dataLoading: false,
  findLoading: false,
  saveLoading: false,
  deleteLoading: false,
  exportLoading: false,
  error: null,
  redirectTo: "/contact",
  record: null,
  users: [],
  current: null,
};

const userReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case constants.USER_GET_CURRENT_SUCCESS:
        draft.current = payload;
        break;
      case constants.USER_GET_START:
        draft.findLoading = true;
        draft.error = null;
        break;
      case constants.USER_GET_SUCCESS:
        draft.findLoading = false;
        draft.users = payload;
        draft.error = null;
        break;
      case constants.USER_GET_ERROR:
        draft.findLoading = false;
        draft.error = payload;
        break;

      default:
        break;
    }
  });

export default userReducer;

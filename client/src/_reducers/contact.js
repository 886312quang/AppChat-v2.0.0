import * as constants from "../constants/contact";
import produce from "immer";

const initialState = {
  initLoading: true,
  dataLoading: false,
  findLoading: false,
  saveLoading: false,
  deleteLoading: false,
  exportLoading: false,
  error: null,
  redirectTo: "/contact",
  selectedRowKeys: [],
  selectedRows: [],
  record: null,
  contactLoading: false,
  requestLoading: false,
  requestSentLoading: false,
  contacts: [],
  requests: [],
  requestsSent: [],
};

const contactReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case constants.CONTACT_CREATE_START:
        draft.saveLoading = true;
        draft.error = null;
        break;
      case constants.CONTACT_CREATE_SUCCESS:
        draft.saveLoading = false;
        draft.requestsSent.push(payload);
        draft.error = null;
        break;
      case constants.CONTACT_CREATE_ERROR:
        draft.saveLoading = false;
        draft.error = payload;
        break;
      case constants.CONTACT_GET_START:
        draft.contactLoading = true;
        draft.error = null;
        break;
      case constants.CONTACT_REMOVE_SENT_START:
        draft.deleteLoading = true;
        draft.error = null;
        break;
      case constants.CONTACT_REMOVE_SENT_SUCCESS:
        draft.deleteLoading = false;
        draft.requestsSent = state.requestsSent.filter(
          (item) => item._id !== payload.contactId,
        );
        draft.error = null;
        break;
      case constants.CONTACT_REMOVE_SENT_ERROR:
        draft.deleteLoading = false;
        draft.error = payload;
        break;
      case constants.CONTACT_GET_SUCCESS:
        draft.contactLoading = false;
        draft.contacts = payload.contacts;
        draft.requests = payload.requests;
        draft.requestsSent = payload.requestsSent;
        draft.error = null;
        break;
      case constants.CONTACT_GET_ERROR:
        draft.contactLoading = false;
        draft.error = payload;
        break;
      case constants.REQUEST_GET_START:
        draft.requestLoading = true;
        draft.error = null;
        break;
      case constants.REQUEST_GET_SUCCESS:
        draft.requestLoading = false;
        draft.requests = payload;
        draft.error = null;
        break;
      case constants.REQUEST_GET_ERROR:
        draft.requestLoading = false;
        draft.error = payload;
        break;
      case constants.REQUEST_SENT_GET_START:
        draft.requestSentLoading = true;
        draft.error = null;
        break;
      case constants.REQUEST_SENT_GET_SUCCESS:
        draft.requestSentLoading = false;
        draft.requestsSent = payload;
        draft.error = null;
        break;
      case constants.REQUEST_SENT_GET_ERROR:
        draft.requestSentLoading = false;
        draft.error = payload;
        break;
      default:
        break;
    }
  });

export default contactReducer;

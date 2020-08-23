import constants from "../constants/message";
import * as constantsContact from "../constants/contact";
import produce from "immer";
import playBell from "../components/Shared/sound/bell";

const initialState = {
  initLoading: true,
  messageListLoading: false,
  hasMoreMessageList: true,
  sending: false,
  scrollToBottom: false,
  findLoading: false,
  hasMoreConversation: false,
  getImageListLoading: false,
  error: null,
  record: null,
  messages: [],
  inputMessage: {
    images: [],
    text: "",
    files: [],
  },
  typing: {},
  imageList: [],
  fileList: [],
};

const messageReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    let currentUser, message;
    switch (type) {
      case constants.CHAT_GET_START:
        draft.messageListLoading = true;
        draft.hasMoreMessageList = true;
        draft.error = null;
        draft.typing = {};
        draft.sending = false;
        break;
      case constants.CHAT_GET_SUCCESS:
        draft.messageListLoading = false;
        if (payload.skip && payload.skip > 0) {
          // Nếu skip > 0 => Load more
          if (payload.messages.length < 1) {
            // Nếu không còn message list => hasMore = false
            draft.hasMoreMessageList = false;
          }
          draft.messages = state.messages.concat(payload.messages);
        } else {
          // Get messages list lần đầu tiên
          draft.messages = payload.messages;
        }
        draft.error = null;
        break;
      case constantsContact.LIST_USER_ONLINE:
        draft.messages.forEach((user) => {
          payload.forEach((i) => {
            if (user._id == i) {
              user.online = true;
            }
          });
        });
        break;
      case constantsContact.NEW_USER_ONLINE:
        draft.messages.forEach((user) => {
          if (user._id === payload) {
            user.online = true;
          }
        });
        break;
      case constantsContact.NEW_USER_OFFLINE:
        draft.messages.forEach((user) => {
          if (user._id === payload) {
            user.online = false;
          }
        });
        break;
      case constantsContact.ON_ACCEPT_REQUEST_ADD:
        draft.messages.unshift(payload);
        break;
      case constantsContact.ACCEPT_CONTACT_SUCCESS:
        draft.messages.unshift(payload.userContact);
        break;
      case constantsContact.CONTACT_REMOVE_CONTACT_SUCCESS:
        draft.messages = state.messages.filter(
          (message) => message._id !== payload,
        );
        break;
      case constants.TARGET_CONVERSATION_START:
        draft.findLoading = true;
        draft.typing = {};
        draft.sending = false;
        draft.hasMoreConversation = true;
        break;
      case constants.TARGET_CONVERSATION:
        draft.findLoading = false;
        if (payload) {
          state.messages.forEach((message) => {
            if (message._id === payload.userId) {
              draft.record = message;
              draft.hasMoreConversation = true;
            }
          });
        } else {
          draft.hasMoreConversation = false;
          draft.record = null;
        }
        break;
      default:
        break;
    }
  });

export default messageReducer;

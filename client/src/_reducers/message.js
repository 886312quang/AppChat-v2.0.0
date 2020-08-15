import * as constants from "../constants/message";
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
  messages: null,
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
  });

export default messageReducer;

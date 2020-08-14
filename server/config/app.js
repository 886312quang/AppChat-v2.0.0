const app = {
  max_event_listeners: 30,
  avatar_directory: "src/public/images/users",
  images_message_directory: "src/public/images/chat/message",
  attachment_message_directory: "src/public/images/chat/message",
  avatar_type: ["image/png", "image/jpg", "image/jpeg"],
  avatar_limit_size: 1048576, // 1mb
  imageMessage_type: ["image/png", "image/jpg", "image/jpeg"],
  imageMessage_limit_size: 1048576, // 1mb
  attachmentMessage_limit_size: 1048576, // 1mb
  general_avatar_group_chat: "groupchat.png",
};

module.exports = app;

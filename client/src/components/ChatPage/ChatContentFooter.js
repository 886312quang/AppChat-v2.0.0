import React, { useState, useRef } from "react";
import { Upload, Button, Input, Popover } from "antd";
import { Image, Send, Smile, Paperclip } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../../_selectors/message";
import actions from "../../_actions/message";
import constants from "../../constants/message";
import layoutSelectors from "../../_selectors/layout";
import { Picker } from "emoji-mart";
import { isAuthenticated } from "../../components/Shared/Routes/permissionChecker";

let typingTimer = null;

function delay(callback, ms) {
  window.clearTimeout(typingTimer);
  typingTimer = setTimeout(function () {
    callback();
  }, 1500);
}

function ChatContentFooter() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Upload
          accept="image/*"
          name="photos"
          multiple={true}
          fileList
          headers={{
            Authorization: `Bearer ${isAuthenticated()}`,
          }}
          action={`${process.env.REACT_APP_API_URI}/message/photos`}
          showUploadList={false}
          onChange={(files) => {
            //onInputImageListChange(files);
          }}
        >
          <Button
            shape="circle"
            className="bg-transparent"
            style={{ border: "0" }}
          >
            <Image size={20} strokeWidth={1} />
          </Button>
        </Upload>
        <Upload
          accept="text/plain, application/pdf, .csv, .docx, .xlsx"
          name="files"
          multiple={true}
          fileList
          headers={{
            Authorization: `Bearer ${isAuthenticated()}`,
          }}
          action={`${process.env.REACT_APP_API_URI}/message/files`}
          showUploadList={false}
          onChange={(files) => {
            //onInputFileListChange(files);
          }}
        >
          <Button
            shape="circle"
            className="bg-transparent"
            style={{ border: "0" }}
          >
            <Paperclip size={20} strokeWidth={1} />
          </Button>
        </Upload>
        <Input
          ref
          placeholder="Type a message"
          value
          onChange={(e) => {
            //onInputMessageChange(e.target.value);
          }}
          style={{ borderRadius: "1rem", color: "black" }}
          onPressEnter
          onKeyUp={() => {
           /*  if (!typing) {
              setTyping(true);
              if (inputMessage.text.trim() !== "") {
                emitTypingOn({
                  info: currentUser,
                  receiver: record.receiver,
                  conversationType: record.conversationType,
                });
              }
            }
            delay(() => {
              handleTypingOff();
              setTyping(false);
            }, 1000); */
          }}
          suffix={
            <Popover
              content={
                <Picker set="facebook" sheetSize={32} onSelect />
              }
              title="Title"
              trigger="click"
              visible
              onVisibleChange
            >
              <Smile style={{ cursor: "pointer" }} size={20} strokeWidth={1} />
            </Popover>
          }
        />

        <Button shape="circle" type="link" onClick>
          <Send size={20} strokeWidth={1} />
        </Button>
      </div>
    </>
  );
}

export default ChatContentFooter;

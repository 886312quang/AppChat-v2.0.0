import React, { useState } from "react";
import { Icon, Spin, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../../_selectors/message";
import userSelectors from "../..//_selectors/user";
import AvatarCus from "../../components/Commons/AvatarCus";
import TypingIndicator from "../../components/Commons/TypingIndicator";
import Carousel, { Modal, ModalGateway } from "react-images";
import actions from "../../_actions/message";
import InfiniteScroll from "react-infinite-scroller";
import Moment from "react-moment";

function Conversation({ messages }) {
  const dispatch = useDispatch();

  // Selector
  const record = useSelector(selectors.selectRecord);
  const typing = useSelector(selectors.selectTyping);
  const hasMoreConversation = useSelector(selectors.selectHasMoreConversation);
  const sending = useSelector(selectors.selectSending);
  const findLoading = useSelector(selectors.selectFindLoading);
  const currentUser = useSelector(userSelectors.selectCurrentUser);

  // State
  const [imageViewModelVisible, setImageViewModelVisible] = useState(false);
  const [currentImageViewIndex, setCurrentImageViewIndex] = useState(0);

  let imagesList = [];

  const loadMoreConversation = () => {
    dispatch(actions.doFind(record.receiver.id, record.messages.length));
  };

  const getFullName = (record) => {
    if (record && record.userName) return record.userName;
    return "";
  };

  const renderConversation = (messages) => {
    if (!currentUser) return <span></span>;
    return messages.map((message, index) => {
      console.log(message);
      if (message.conversationType === "notification") {
        return (
          <div key={index} className="notification-message">
            <span>{message}</span>
          </div>
        );
      }
      return (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ width: 30, marginRight: "5px" }}>
            {currentUser && message.senderId !== currentUser._id && record && (
              <Tooltip
                title={
                  message.conversationType === "ChatGroup"
                    ? getFullName(message.sender)
                    : getFullName(record)
                }
              >
                <AvatarCus
                  record={
                    message.conversationType === "ChatGroup"
                      ? message.sender
                      : record
                  }
                  size={30}
                />
              </Tooltip>
            )}
          </div>
          <div
            key={index}
            className={`conversation
                       						 ${
                                     message.senderId === currentUser._id
                                       ? "conversation-sent"
                                       : "conversation-received"
                                   }`}
          >
            {message.senderId === currentUser._id ? (
              // Nếu người gửi là user hiện tại
              <>
                {message.messageType === "text" ? (
                  <Tooltip
                    placement="bottomRight"
                    title={
                      message.createdAt && (
                        <Moment format="HH:mm DD//MM/YYYY">
                          {message.createdAt}
                        </Moment>
                      )
                    }
                  >
                    <div className={`body body-sent`}>{message.text}</div>
                  </Tooltip>
                ) : message.messageType === "image" &&
                  message.images.length > 0 ? (
                  <div
                    className={`body-sent-no-backGround`}
                    style={{ maxWidth: "100%" }}
                  >
                    {message.images.map((image, key) => (
                      <div
                        key={key}
                        style={{
                          backgroundImage: `url(${process.env.REACT_APP_STATIC_PHOTOS}/${image})`,
                        }}
                        className="photo"
                        onClick={() => {
                          setImageViewModelVisible(true);
                          setCurrentImageViewIndex(
                            imagesList
                              .map((e) => e.src)
                              .indexOf(
                                `${process.env.REACT_APP_STATIC_PHOTOS}/${image}`,
                              ),
                          );
                        }}
                      ></div>
                    ))}
                  </div>
                ) : message.messageType === "file" ? (
                  <div className={`body body-sent`}>
                    {message.files.map((file, key) => (
                      <div key={key}>
                        <a
                          key={key}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            color: "white",
                          }}
                          href={`${process.env.REACT_APP_STATIC_FILES}/${file.path}`}
                        >
                          <Icon type="paper-clip" /> {file.name}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              // Nếu người gửi không phải là user hiện tại
              <>
                {message.messageType === "text" ? (
                  <Tooltip
                    placement="bottomLeft"
                    title={
                      message.createdAt && (
                        <Moment format="HH:mm DD//MM/YYYY">
                          {message.createdAt}
                        </Moment>
                      )
                    }
                  >
                    <div className={`body body-received text-body`}>
                      {record.conversationType === "group" && (
                        <p
                          style={{
                            color: "#868686",
                            fontSize: "12px",
                          }}
                        >
                          <div>Group</div>
                        </p>
                      )}
                      {message.text}
                    </div>
                  </Tooltip>
                ) : message.messageType === "image" &&
                  message.images.length > 0 ? (
                  <div style={{ maxWidth: "80%" }}>
                    {message.images.map((image, key) => (
                      <div
                        key={key}
                        style={{
                          backgroundImage: `url(${process.env.REACT_APP_STATIC_PHOTOS}/${image})`,
                        }}
                        className="photo"
                        onClick={() => {
                          setImageViewModelVisible(true);
                          setCurrentImageViewIndex(
                            imagesList
                              .map((e) => e.src)
                              .indexOf(
                                `${process.env.REACT_APP_STATIC_PHOTOS}/${image}`,
                              ),
                          );
                        }}
                      ></div>
                    ))}
                  </div>
                ) : message.messageType === "file" ? (
                  <div className={`body body-received`}>
                    {message.files.map((file, key) => (
                      <div key={key}>
                        <a
                          key={key}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            color: "rgba(0, 0, 0, 0.65)",
                          }}
                          href={`${process.env.REACT_APP_STATIC_FILES}/${file.path}`}
                        >
                          <Icon type="paper-clip" /> {file.name}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      );
    });
  };

  const typIndicator = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ width: 30, marginRight: "5px" }}>
        <AvatarCus
          record={typing && typing.info ? typing.info : null}
          size={30}
        />
      </div>
      <div className={`conversation conversation-received`}>
        <div>
          <TypingIndicator />
        </div>
      </div>
    </div>
  );

  if (record && record.messages) {
    let tempList = [];
    record.messages.forEach((message, index) => {
      if (message.images && message.images.length > 0) {
        tempList = tempList.concat(message.images);
      }
    });
    tempList = tempList.reverse();
    imagesList = tempList.map((image) => {
      return { src: `${process.env.REACT_APP_STATIC_PHOTOS}/${image}` };
    });
  }

  const handleInfiniteOnLoad = () => {
    loadMoreConversation();
  };

  return (
    <>
      <ModalGateway>
        {imageViewModelVisible ? (
          <Modal onClose={() => setImageViewModelVisible(false)}>
            <Carousel
              currentIndex={currentImageViewIndex}
              components={{ FooterCaption: () => null }}
              views={imagesList}
            />
          </Modal>
        ) : null}
      </ModalGateway>

      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!findLoading && hasMoreConversation}
        useWindow={false}
        isReverse={true}
      >
        <div style={{ textAlign: "center" }}>
          <Spin spinning={findLoading && hasMoreConversation}></Spin>
        </div>
        {renderConversation(messages)}
        {typing && typing.status && typIndicator}
        <div
          style={{
            textAlign: "right",
            color: "#8d8d8d",
            fontSize: "12px",
          }}
        >
          {sending && <span>Sending...</span>}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Conversation;

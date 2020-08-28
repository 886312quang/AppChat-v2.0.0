import React, { useEffect, lazy, useState } from "react";
import { Layout, Row, Result } from "antd";
import layoutSelectors from "../../_selectors/layout";
import actions from "../../_actions/message";
import layoutActions from "../../_actions/layout";
//import contactActions from "../ContactPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import selectors from "../../_selectors/message";
import userSelectors from "../../_selectors/user";
import constants from "../../constants/message";
import { emitCheckStatus, onListUserOnline } from "../../sockets/checkStatus";
import RightSideBar from "./RightSidebar";
import { isAuthenticated } from "../Shared/Routes/permissionChecker";
import { configSocket } from "../../sockets/rootSocket";

//import callActions from "../CallPage/actions";
const Sidebar = lazy(() => import("./Sidebar"));
const ChatContent = lazy(() => import("./ChatContent"));
//const RightSideBar = lazy(() => import("./RightSidebar"));

export default function ChatPage() {
  const dispatch = useDispatch();

  // Selector
  // Layout
  const rightSidebarVisible = useSelector(
    layoutSelectors.selectRightSidebarVisible,
  );
  const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
  const record = useSelector(selectors.selectRecord);
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const inputMessage = useSelector(selectors.selectInputMessage);
  const target = useSelector(selectors.selectClickTarget);

  // Params
  let userId = useParams();
  let lengthObjUserId = Object.entries(userId).length;

  const windowOnResize = () => {
    dispatch(layoutActions.doWindowResize(window.innerWidth));
  };

  useEffect(() => {
    async function firstTarget(userId) {
      await dispatch(actions.list());
      if (lengthObjUserId > 0 && !target) {
        await dispatch({
          type: constants.TARGET_CONVERSATION,
          payload: userId,
        });
      }
    }

    firstTarget(userId);
    //dispatch(contactActions.listRequests());
    if (isAuthenticated() && currentUser) {
      emitCheckStatus();
    }
    windowOnResize(window.innerWidth);
    window.addEventListener("resize", windowOnResize);
    //dispatch(callActions.doGetIceServer());
    return () => {
      window.removeEventListener("resize", windowOnResize);
    };
  }, []);

  useEffect(() => {
    if (lengthObjUserId > 0 && target) {
      dispatch({ type: constants.TARGET_CONVERSATION, payload: userId });
      dispatch({ type: constants.CHANGE_CONVERSATION, payload: userId });
    }
    if (inputMessage) {
      if (inputMessage.images.length > 0) {
        dispatch(
          actions.doDeleteList({
            fileList: inputMessage.images,
            type: "images",
          }),
        );
      } else if (inputMessage.files.length > 0) {
        dispatch(
          actions.doDeleteList({
            fileList: inputMessage.files,
            type: "files",
          }),
        );
      }
    }
  }, [userId]);

  /* if (record) {
    // dispatch(layoutActions.doHideLeftSidebar());
  } */

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
      <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
        <Sidebar />
        {record ? (
          <>
            <ChatContent />
            {rightSidebarVisible && <RightSideBar />}
          </>
        ) : !isMobileDevice ? (
          <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-white mh-page"
            style={{
              minHeight: "100vh",
              width: "100%",
            }}
          >
            <Result
              icon={<img width="200" src="/ahoo.png" />}
              title="Welcome to Ahoo Chat"
              subTitle="On Being Ahoo"
            />
          </Row>
        ) : null}
      </Layout>
    </Layout>
  );
}

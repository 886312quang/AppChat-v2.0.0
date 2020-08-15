import React, { useEffect, lazy } from "react";
import { Layout, Row, Result } from "antd";
import layoutSelectors from "../../_selectors/layout";
import actions from "../../_actions/message";
//import contactActions from "../ContactPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import selectors from "../../_selectors/message";
import layoutActions from "../../_actions/layout";
//import callActions from "../CallPage/actions";
const Sidebar = lazy(() => import("./Sidebar"));
const ChatContent = lazy(() => import("./ChatContent"));
//const RightSideBar = lazy(() => import("./RightSidebar"));

export default function ChatPage() {
  const dispatch = useDispatch();
  let { userId } = useParams();
  console.log(userId);

  const rightSidebarVisible = useSelector(
    layoutSelectors.selectRightSidebarVisible,
  );
  const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
  //const record = useSelector(selectors.selectRecord);

  const windowOnResize = () => {
    dispatch(layoutActions.doWindowResize(window.innerWidth));
  };

  useEffect(() => {
    //dispatch(actions.list());
    //dispatch(contactActions.listRequests());
    windowOnResize(window.innerWidth);
    window.addEventListener("resize", windowOnResize);
    //dispatch(callActions.doGetIceServer());
    return () => {
      window.removeEventListener("resize", windowOnResize);
    };
  }, []);
  /* useEffect(() => {
    if (userId) {
      dispatch(actions.doFind(userId));
    }
  }, [userId]); */

  /* if (record) {
    // dispatch(layoutActions.doHideLeftSidebar());
  } */

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
      <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
        <Sidebar />
        <ChatContent />
      </Layout>
    </Layout>
  );
}

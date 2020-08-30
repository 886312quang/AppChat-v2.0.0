import React from "react";
import { Video, Info, ArrowLeft, Phone } from "react-feather";
import actions from "../../_actions/message";
import selectors from "../../_selectors/message";
//import callSelectors from "../CallPage/selectors";
import userSelectors from "../../_selectors/user";
import { Button, Row, Layout, Badge } from "antd";
import AvatarCus from "../../components/Commons/AvatarCus";
import { useSelector, useDispatch } from "react-redux";
//import { emitCheckListenerStatus } from "../CallPage/socket";
import layoutActions from "../../_actions/layout";
import layoutSelectors from "../../_selectors/layout";
import { Link } from "react-router-dom";
import { textAbstract } from "../Shared/helper";
import * as constantLayout from "../../constants/layout";

const { Header } = Layout;

function ChatContentHeader() {
  const dispatch = useDispatch();

  // Selector
  const record = useSelector(selectors.selectRecord);
  //const peerId = useSelector(callSelectors.selectPeerId);
  const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);

  const handleCallVideoClick = () => {
    // b01. kiểm trả listener có online hay không
    /* let caller = {
      id: currentUser.id,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      picture: currentUser.picture,
    };
    emitCheckListenerStatus({ caller, listener: record.receiver }); */
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.3rem 2rem",
        zIndex: "1",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
        height: "auto",
        lineHeight: "auto",
        backgroundColor: "#fff",
      }}
    >
      <Row type="flex" align="middle">
        {isMobileDevice && (
          <Link to="/">
            <Button
              style={{ border: "0", marginLeft: "-1.2rem" }}
              shape="circle"
              onClick={() => {
                dispatch(actions.doClear());
                dispatch(layoutActions.doShowLeftSidebar());
              }}
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </Button>
          </Link>
        )}

        <AvatarCus record={record ? record : null} />

        <span className="ml-3" style={{ lineHeight: "1" }}>
          <span style={{ display: "block" }}>
            {record
              ? record.members
                ? isMobileDevice
                  ? textAbstract(record.userName, 25)
                  : record.name
                : record.userName
              : ""}
          </span>
        </span>
      </Row>
      <span className="mr-auto" />
      <div>
        {record /*  && record[0].conversationType === "personal" */ && (
          <>
            <Button
              shape="circle"
              style={{ border: "0" }}
              onClick={() => alert("Ban da nhan vao link")}
            >
              <Phone size={20} strokeWidth={1} />
            </Button>
            <Button
              style={{ border: "0" }}
              shape="circle"
              onClick={handleCallVideoClick}
            >
              <Video size={20} strokeWidth={1} />
            </Button>
          </>
        )}
        <Button
          style={{ border: "0" }}
          shape="circle"
          onClick={() =>
            dispatch({ type: constantLayout.LAYOUT_RIGHT_SIDEBAR_TOGGLE })
          }
        >
          <Info size={20} strokeWidth={1} />
        </Button>
      </div>
    </Header>
  );
}

export default ChatContentHeader;

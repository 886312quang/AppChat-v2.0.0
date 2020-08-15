import React from "react";
import { Video, Info, ArrowLeft } from "react-feather";
import actions from "../../_actions/message";
import selectors from "../../_selectors/message";
import { Button, Row, Layout } from "antd";
import AvatarCus from "../Commons/AvatarCus";
import { useSelector, useDispatch } from "react-redux";
import layoutActions from "../../_actions/layout";
import layoutSelectors from "../../_selectors/layout";
import { Link } from "react-router-dom";
import { textAbstract } from "../../components/Shared/helper";
const { Header } = Layout;

function ChatContentHeader() {
 
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
          <div>HEADER</div>
        {/* {isMobileDevice && (
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
        )} */}

        <AvatarCus record />

        <span className="ml-3" style={{ lineHeight: "1" }}>
          
          {/* <small className="text-muted">
                        <span>Online</span>
                    </small> */}
        </span>
      </Row>
      <span className="mr-auto" />
      <div>
        <Button
          style={{ border: "0" }}
          shape="circle"
          onClick
        >
          <Info size={20} strokeWidth={1} />
        </Button>
      </div>
    </Header>
  );
}

export default ChatContentHeader;

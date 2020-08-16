import React, { useState, useEffect } from "react";
import userSelectors from "../../../_selectors/user";
import AvatarCus from "../../Commons/AvatarCus";
import actions from "../../../_actions/contact";
import selector from "../../../_selectors/contact";
import ListUser from "./styles/ListUser";
import { useDispatch, useSelector } from "react-redux";
import { List, Tooltip, Button } from "antd";

function Contact() {
  const dispatch = useDispatch();

  // Selector
  const contacts = useSelector(selector.selectContacts);
  console.log(contacts);

  // State
  const [Action, setAction] = useState("remove");

  const handleAddContactClick = (userInfo) => {
    dispatch(actions.doCreate(userInfo));
    setAction("cancel");
  };

  const handleRemoveContactClick = (userInfo) => {
    setAction("add");
  };

  const renderContacts = (contacts) => {
    return (
      <List
        className="scroll-y flex-1 bg-transparent"
        itemLayout="horizontal"
        dataSource={contacts}
        renderItem={(item, index) => (
          <List.Item className={`"border-0" border-0 px-4 py-3`}>
            <List.Item.Meta
              avatar={<AvatarCus record={item.avatar} />}
              title={
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  {item.userName}
                </span>
              }
              description={
                <>
                  {Action === "remove" && (
                    <>
                      <Tooltip title="Remove contact">
                        <Button
                          size="small"
                          onClick={() => handleRemoveContactClick(item)}
                        >
                          Remove Contact
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <ListUser
        style={{ maxHeight: "400px", overflowY: "auto", padding: "30px" }}
      >
        {renderContacts()}
      </ListUser>
    </div>
  );
}

export default Contact;

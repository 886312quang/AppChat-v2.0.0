import React, { useState, useEffect } from "react";
import userSelectors from "../../../_selectors/user";
import AvatarCus from "../../Commons/AvatarCus";
import actions from "../../../_actions/contact";
import selector from "../../../_selectors/contact";
import ListUser from "./styles/ListUser";
import { useDispatch, useSelector } from "react-redux";
import { List, Tooltip, Button, Badge } from "antd";

function Contact() {
  const dispatch = useDispatch();

  // Selector
  const contacts = useSelector(selector.selectContacts);

  const handleRemoveContactClick = (id) => {
    dispatch(actions.removeContact(id));
  };

  const renderContacts = () => {
    return (
      <List
        className="scroll-y flex-1 bg-transparent"
        itemLayout="horizontal"
        dataSource={contacts}
        renderItem={(item, index) => (
          <List.Item className={`"border-0" border-0 px-4 py-3`}>
            <List.Item.Meta
              avatar={
                <Badge
                  status={item.online === true ? "success" : "default"}
                  offset={[-5, 35]}
                >
                  <AvatarCus record={item.avatar} />
                </Badge>
              }
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
                  {item.address ? (
                    <span
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      {item.address}
                    </span>
                  ) : (
                    ""
                  )}
                  <br />

                  <>
                    <Button
                      type="danger"
                      size="small"
                      onClick={() => handleRemoveContactClick(item._id)}
                    >
                      Remove Contact
                    </Button>
                  </>
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

import { Form, Icon, Upload, message, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../../components/Shared/Routes/permissionChecker";
import * as constants from "../../../constants/user";
import { useDispatch } from "react-redux";

const UpdateAvatar = ({
  avatar,
  action = `${process.env.REACT_APP_API_URI}/user/updateAvatar`,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(avatar ? avatar : "");

  const dispatch = useDispatch();

  useEffect(() => {
    setImageUrl(avatar);
    return () => {};
  }, [avatar]);

  let getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  let beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  let handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      if (info.file.response.message === "success") {
        onSuccess(info.file.response.avatar);
      }
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
   
    dispatch({ type: constants.USER_GET_CURRENT_SUCCESS });
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload Avatar</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="avatar-card"
      className="avatar-uploader"
      showUploadList={false}
      action={action}
      headers={{
        Authorization: "Bearer " + isAuthenticated(),
        "x-access-token": isAuthenticated(),
      }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Avatar
          src={imageUrl}
          alt="avatar"
          style={{ width: "30%", height: "200%" }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default Form.create()(UpdateAvatar);

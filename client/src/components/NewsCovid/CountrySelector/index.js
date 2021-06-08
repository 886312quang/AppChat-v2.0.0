import React from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;
const FormItem = Form.Item;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CountrySelector = ({ countries, handleOnchange, value }) => {
  const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 6 },
  };
  return (
    <Form {...layout} name="control-hooks" {...formItemLayout}>
      <Form.Item label="Quốc gia">
        <span className="ant-form-text"> VN</span>
      </Form.Item>
      <Form.Item
        name="select"
        label="Select"
        hasFeedback
        rules={[{ required: true, message: "Please select your country!" }]}
        value={value}
      >
        <Select
          placeholder="Please select a country"
          onChange={handleOnchange}
          value={value}
        >
          {countries.map((item, index) => {
            return (
              <Option value={item.ISO2.toLowerCase()} index={index}>
                {item.Country}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default CountrySelector;

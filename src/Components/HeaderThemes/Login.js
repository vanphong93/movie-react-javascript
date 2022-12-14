import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/actions/actionUser";
export const LoginPage = ({ modal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let onSuccess = () => {
      message.success("Đăng nhập thành công");
      modal(false);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    };
    let onFailed = () => {
      message.error("Đăng nhập thất bại");
    };
    dispatch(setLogin(values, onSuccess, onFailed));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className=" w-full"
      layout="vertical"
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên đăng nhập"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Xin điền tên đăng nhập",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật Khẩu"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Xin hãy điền mật khẩu",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

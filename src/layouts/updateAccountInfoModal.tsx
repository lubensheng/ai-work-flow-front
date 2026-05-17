import { Button, Form, Input, message, Modal } from "antd";
import { updateUserInfo } from "./services";
import { SUCCESS_CODE } from "../utils/constants";
import { useNavigate } from "react-router";

interface ViewProps {
  isOpen: boolean;
  initValues: {
    userName: string;
  };
  onCancel: () => void;
}

function UpdateAccountModal(props: ViewProps) {
  const { isOpen, onCancel, initValues } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSure = async () => {
    try {
      const values = await form.validateFields();
      const res = await updateUserInfo({
        userName: initValues.userName,
        password: values.password,
      });
      if (res.data.code !== SUCCESS_CODE) {
        message.error(res.data.message);
        return;
      }
      message.success("修改成功");
      localStorage.removeItem("userInfo");
      onCancel();
      form.resetFields();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel}>取消</Button>
          <Button className="ml-[10px]" type="primary" onClick={handleSure}>
            确定
          </Button>
        </div>
      }
    >
      <div className="mt-[20px]">
        <Form form={form} labelCol={{ flex: "100px" }}>
          <Form.Item
            name="password"
            label="新密码"
            rules={[
              {
                required: true,
                validator(_r, value) {
                  if (!value) {
                    return Promise.reject("请输入");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder="请输入密码"
              style={{ width: "95%" }}
              onChange={() => {
                form.validateFields(["passwordSure"]);
              }}
            />
          </Form.Item>
          <Form.Item
            name="passwordSure"
            label="确认新密码"
            rules={[
              {
                required: true,
                validator(_r, value) {
                  console.log(value);
                  const password = form.getFieldValue("password");
                  if (!value) {
                    return Promise.reject(new Error("请输入"));
                  }
                  if (password !== value) {
                    return Promise.reject(new Error("两次输入的密码不一致"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="请输入密码" style={{ width: "95%" }} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default UpdateAccountModal;

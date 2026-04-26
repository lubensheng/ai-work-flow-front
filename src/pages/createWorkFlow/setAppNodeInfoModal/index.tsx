import { Button, Form, Input, Modal } from "antd";
import type { AppNodeItem } from "../../../store/appNodeInfo";
import { useEffect } from "react";

interface ViewProps {
  isOpen: boolean;
  initValue: AppNodeItem;
  onOk: (value: AppNodeItem) => void;
  onCancel: () => void;
}

function SetAppNodeInfoModal(props: ViewProps) {
  const { isOpen, initValue, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk({
        ...initValue,
        appName: values.appName,
        appDesc: values.appDesc,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    } else {
      form.setFieldsValue(initValue);
    }
  }, [isOpen, initValue]);

  return (
    <Modal
      open={isOpen}
      footer={
        <div>
          <Button onClick={onCancel}>取消</Button>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleOk}
          >
            确定
          </Button>
        </div>
      }
    >
      <Form form={form} labelCol={{ flex: "80px" }}>
        <Form.Item
          label="应用名称"
          name="appName"
          rules={[{ required: true, message: "应用名称不能为空" }]}
        >
          <Input placeholder="请输入应用名称" />
        </Form.Item>
        <Form.Item label="描述" name="appDesc">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SetAppNodeInfoModal;

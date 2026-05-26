import { Button, Form, Input, message, Modal, Select } from "antd";
import { modalType } from "./constants";
import { useEffect } from "react";
import { addLLMConfig } from "./services";

interface ViewProps {
  isOpen: boolean;
  type: "edit" | "add";
  onCancel: () => void;
  onOk: () => void;
}

function AddModal(props: ViewProps) {
  const { isOpen, type, onCancel, onOk } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const onSure = async () => {
    try {
      const values = await form.validateFields();
      const res = await addLLMConfig({
        modalType: values["modalType"],
        apiKey: values["apiKey"],
      });
      if (String(res.data.code) !== "0") {
        message.error(res.data.message);
        return;
      }
      message.success("添加成功");
      onOk();
      onCancel();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={type === "edit" ? "编辑模型配置" : "新增模型配置"}
      onCancel={onCancel}
      footer={
        <div className="flex gap-2.5 flex-row-reverse">
          <Button type="primary" onClick={onSure}>
            确定
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </div>
      }
    >
      <Form form={form} labelCol={{ flex: "80px" }}>
        <Form.Item
          name="modalType"
          label="类型"
          rules={[{ required: true, message: "类型必填" }]}
        >
          <Select options={modalType} placeholder="请选择" />
        </Form.Item>
        <Form.Item
          name="apiKey"
          label="apiKey"
          rules={[{ required: true, message: "apiKey必填" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddModal;

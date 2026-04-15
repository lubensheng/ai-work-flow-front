import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import type { Field } from "../../../../type";
import styles from "./index.module.less";
import { FIELD_LIST } from "./constant";

interface ViewProps {
  isOpen: boolean;
  type: "edit" | "add";
  initValues?: Field;
  onCancel: () => void;
  onOk: (item: Field) => void;
}

function AddFieldModal(props: ViewProps) {
  const { isOpen, type, onCancel } = props;
  const [form] = Form.useForm();
  return (
    <ConfigProvider locale={zhCN}>
      <Modal
        open={isOpen}
        onCancel={onCancel}
        title={
          type === "add" ? (
            <h3 className={styles["modal-title"]}>添加变量</h3>
          ) : (
            <h3 className={styles["modal-title"]}>编辑变量</h3>
          )
        }
        footer={
          <div>
            <Button>取消</Button>
            <Button type="primary" style={{ marginLeft: "10px" }}>
              确定
            </Button>
          </div>
        }
      >
        <Form form={form} labelCol={{ flex: "80px" }}>
          <Form.Item name="fieldType" label="字段类型">
            <Select options={FIELD_LIST}></Select>
          </Form.Item>
          <Form.Item name="name" label="变量名称">
            <Input />
          </Form.Item>
          <Form.Item name="showName" label="显示名称">
            <Input />
          </Form.Item>
          <Form.Item name="maxLength" label="最大长度">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="defaultValue" label="默认值">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default AddFieldModal;

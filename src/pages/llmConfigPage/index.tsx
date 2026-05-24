import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import AddModal from "./addModal";
import { useState } from "react";
import styles from "./index.module.less";
import classNames from "classnames";

function LlmConfigPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [type, setType] = useState<"add" | "edit">("add");
  return (
    <div className="p-4">
      <div className="flex flex-row-reverse">
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setType("add");
            setShowAddModal(true);
          }}
        >
          新增
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div
          className={classNames(
            "relative",
            "overflow-hidden",
            "rounded-xl",
            "border",
            "border-solid",
            "border-[#f2f4f7]",
            "border-background-section-burn",
            "p-1",
            "bg-background-section-burn",
            "h-[100px]",
            "bg-[#f2f4f7]"
          )}
        >
          <div className="bg-white h-[100%]">
            <div>模型 豆包</div>
            <div
              className={classNames(
                "absolute",
                "bottom-[8px]",
                "right-[8px]",
                "w-[60px]",
                "text-center",
                "cursor-pointer",
                "p-[5px]",
                styles.hover
              )}
            >
              设置
            </div>
          </div>
        </div>
      </div>
      <AddModal
        isOpen={showAddModal}
        type={type}
        onCancel={() => {
          setShowAddModal(false);
        }}
      />
    </div>
  );
}

export default LlmConfigPage;

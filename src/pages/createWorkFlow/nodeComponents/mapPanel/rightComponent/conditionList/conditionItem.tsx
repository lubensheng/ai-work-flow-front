import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moveIcon from "../../../../../../assets/moveIcon.svg";
import deleteIcon from "../../../../../../assets/delete.svg";
import styles from "./index.module.less";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useState } from "react";

interface ViewProps {
  label: string;
  id: string;
}

function ConditionItem(props: ViewProps) {
  const { id, label } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [mouseIn, setMouseIn] = useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    background: mouseIn ? "#fef0e2" : "#fff",
    cursor: "default",
    marginBottom: "8px",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.container}
    >
      <div
        {...listeners} // 拖拽触发点
        style={{
          cursor: "grab",
          padding: "0 4px",
          color: "#999",
          userSelect: "none",
        }}
      >
        <img src={moveIcon} className="w-[20px] h-[22px]" />
      </div>

      <div>
        <div className="text-[#354052] text-[13px] font-semibold">{label}</div>
        <div className="text-[10px] font-medium text-[#676f83]">Case {id}</div>
      </div>
      <div className="ml-[16px]">
        <Button icon={<PlusOutlined />}>添加条件</Button>
      </div>
      <div
        className={classNames(
          "flex",
          "items-center",
          "ml-auto",
          "p-[8px]",
          "cursor-pointer",
          "text-[#354052]",
          "rounded-md",
          styles["delete-container"]
        )}
        onMouseEnter={() => setMouseIn(true)}
        onMouseLeave={() => setMouseIn(false)}
      >
        <img src={deleteIcon} className="w-[14px] h-[14px]" />
        <span className="inline-block ml-[5px]">删除</span>
      </div>
    </div>
  );
}

export default ConditionItem;

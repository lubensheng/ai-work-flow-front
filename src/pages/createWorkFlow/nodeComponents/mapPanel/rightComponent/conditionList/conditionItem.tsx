import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moveIcon from "../../../../../../assets/moveIcon.svg";
import deleteIcon from "../../../../../../assets/delete.svg";
import ConditionEv from "../../../../../../assets/conditionEn.svg";
import styles from "./index.module.less";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useEffect, useState } from "react";
import useNodeList from "../../../../../../store/nodeList";
import {
  ConditionRelationType,
  type EnvironmentItem,
  type NodeItem,
  type ConditionItem as ConditionListItem,
} from "../../../../../../store/types/nodeListTypes";
import {
  CONDITION_RELATION_CN_MAP,
  CONDITION_RELATION_OPTIONS,
} from "../../../../constants";
import SelectPanel from "../../../../../../components/select";
import CustomInput from "../../../../../../components/customInput";

interface ViewProps {
  label: string;
  id: string;
  nodeId: string;
  nodeList: NodeItem[];
  handelAddCondition: (isOpen: boolean, conditionId: string) => void;
}

function ConditionItem(props: ViewProps) {
  const { id, label, nodeId, nodeList } = props;
  const environments = useNodeList((s) => s.environment);
  const setConditionNodeByCondition = useNodeList(
    (s) => s.setConditionNodeByCondition
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [mouseIn, setMouseIn] = useState(false);
  const [conditionList, setConditionList] = useState<ConditionListItem>();
  const [addCondition, setAddCondition] = useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    gap: "8px",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    background: mouseIn ? "#fef0e2" : "#fff",
    cursor: "default",
    marginBottom: "8px",
  };
  useEffect(() => {
    const currentNodeInfo = nodeList.find((item) => item.id === nodeId);
    if (currentNodeInfo && currentNodeInfo.data?.nodeConfig?.conditions) {
      const current = currentNodeInfo.data!.nodeConfig!.conditions.find(
        (item) => item.id === id
      );
      if (current) {
        setConditionList(current);
      }
    }
  }, [nodeId, nodeList, id]);
  const handleAddCondition = (currentInfo: EnvironmentItem) => {
    console.log(currentInfo);
    setConditionNodeByCondition(id, nodeId, {
      condition: currentInfo,
      type: ConditionRelationType.CONTAIN,
      value: "",
    });
    setAddCondition(false);
  };
  console.log("conditionList-->", conditionList);
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
      <div className="ml-[16px] relative flex-1">
        {conditionList && (
          <div>
            {(conditionList.condition?.conditions?.length || 0) > 1 && (
              <div>
                <div></div>
                <div>{conditionList.condition?.type}</div>
                <div></div>
              </div>
            )}

            <div>
              {conditionList.condition?.conditions.map((item, index) => {
                return (
                  <div
                    key={`${index}-info`}
                    className={styles["condition-item"]}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span className="flex items-center justify-between">
                          <img
                            src={ConditionEv}
                            className="w-[14px] h-[14px]"
                          />
                          <span className="inline-block ml-[6px]">
                            {item.conditionInfo.environmentInfo.key}
                          </span>
                        </span>
                      </div>
                      <SelectPanel
                        options={CONDITION_RELATION_OPTIONS}
                        initValue={CONDITION_RELATION_CN_MAP[item.relationType]}
                      />
                    </div>
                    <div>
                      <CustomInput placeholder="请输入" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-between mt-[10px]">
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setAddCondition(true);
            }}
          >
            添加条件
          </Button>
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

        {addCondition && (
          <div className={classNames(styles["condition-container"])}>
            <Input.Search placeholder="搜索变量" />
            <div style={{ marginTop: "10px" }}>
              <div style={{ color: "#676f83", fontSize: "12px" }}>环境变量</div>
              <div className="mt-[5px]">
                {environments.map((item) => {
                  return (
                    <div
                      key={item.key}
                      className={classNames(
                        "flex",
                        "items-center",
                        "justify-between",
                        styles.hover
                      )}
                      onClick={() => {
                        handleAddCondition(item);
                      }}
                    >
                      <span className="flex items-center justify-between">
                        <img src={ConditionEv} className="w-[14px] h-[14px]" />
                        <span className="inline-block ml-[6px]">
                          {item.key}
                        </span>
                      </span>

                      <span className="text-[#676f83]">{item.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConditionItem;

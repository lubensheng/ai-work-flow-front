import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import transformIcon from "../../../../../../assets/transform.svg";
import moveIcon from "../../../../../../assets/moveIcon.svg";
import deleteIcon from "../../../../../../assets/delete.svg";
import ConditionEv from "../../../../../../assets/conditionEn.svg";
import styles from "./index.module.less";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
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
  const [lineHeight, setLineHeight] = useState("138px");
  const environments = useNodeList((s) => s.environment);
  const setConditionNodeByCondition = useNodeList(
    (s) => s.setConditionNodeByCondition
  );
  const updateConditionType = useNodeList((s) => s.updateConditionType);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [mouseIn, setMouseIn] = useState(false);
  const [currentConditionType, setCurrentConditionType] = useState<
    "and" | "or"
  >("and");
  const [conditionList, setConditionList] = useState<ConditionListItem>();
  const [addCondition, setAddCondition] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [conditionTypeTop, setConditionTypeTop] = useState<string>("0px");
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
        setCurrentConditionType(current.condition?.type || "and");
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

  const handleOnSelectConditionType = (
    currentInfo: EnvironmentItem,
    value: string,
    originValue: string,
    index: number
  ) => {
    setConditionNodeByCondition(id, nodeId, {
      condition: currentInfo,
      type: value as ConditionRelationType,
      value: originValue || "",
      index,
    });
  };

  const handleOnInputConditionValue = (
    currentInfo: EnvironmentItem,
    value: string,
    originValue: string,
    index: number
  ) => {
    setConditionNodeByCondition(id, nodeId, {
      condition: currentInfo,
      type: originValue as ConditionRelationType,
      value: value || "",
      index,
    });
  };

  useEffect(() => {
    const containerDom = containerRef.current;
    if (!containerDom) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      // 获取当前高度
      const currentHeight = entry.contentRect.height;
      setConditionTypeTop(currentHeight / 2 - 25 + "px");
      setLineHeight(currentHeight - 100 + "px");
    });
    resizeObserver.observe(containerDom);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
      <div className="ml-[16px] relative flex-1 relative" ref={containerRef}>
        {conditionList && (
          <div>
            {(conditionList.condition?.conditions?.length || 0) > 1 && (
              <div>
                <div
                  className={styles.line}
                  style={{ height: lineHeight }}
                ></div>
                <div
                  className="absolute"
                  style={{ left: "-58px", top: conditionTypeTop }}
                >
                  <div
                    className={classNames(
                      styles.shadow,
                      styles["switch-condition-type"]
                    )}
                    onClick={() => {
                      updateConditionType(
                        id,
                        nodeId,
                        currentConditionType === "and" ? "or" : "and"
                      );
                    }}
                  >
                    <span>{currentConditionType}</span>
                    <img
                      src={transformIcon}
                      className="w-[14px] h-[14px] ml-[3px]"
                    />
                  </div>
                </div>
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
                      <div className="p-[4px]">
                        <span
                          className={classNames(
                            "flex",
                            "items-center",
                            "justify-between",
                            "bg-[#fff]",
                            "p-[4px]",
                            "rounded-[8px]",
                            styles.shadow
                          )}
                        >
                          <img
                            src={ConditionEv}
                            className="w-[14px] h-[14px]"
                          />
                          <span className="inline-block ml-[6px] text-xs text-[#7839ee]">
                            {item.conditionInfo.environmentInfo.key}
                          </span>
                        </span>
                      </div>
                      <SelectPanel
                        options={CONDITION_RELATION_OPTIONS}
                        initValue={CONDITION_RELATION_CN_MAP[item.relationType]}
                        onSelect={(value) => {
                          handleOnSelectConditionType(
                            item.conditionInfo.environmentInfo,
                            value,
                            item.conditionInfo.conditionValue,
                            index
                          );
                        }}
                      />
                    </div>
                    <div>
                      <CustomInput
                        placeholder="请输入"
                        onChange={(value) => {
                          handleOnInputConditionValue(
                            item.conditionInfo.environmentInfo,
                            value,
                            item.relationType,
                            index
                          );
                        }}
                      />
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
            onClick={(e) => {
              e.stopPropagation();
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

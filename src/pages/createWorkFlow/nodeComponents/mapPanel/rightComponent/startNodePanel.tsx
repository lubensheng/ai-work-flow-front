import { useEffect, useState } from "react";
import startNodeSvg from "../../../../../assets/startNode.svg";
import EditSvg from "../../../../../assets/edit.svg";
import DeleteSvg from "../../../../../assets/delete.svg";
import commonStyles from "./styles/common.module.less";
import styles from "./styles/startNode.module.less";
import type { NodeItem } from "../../../../../store/nodeList";
import classNames from "classnames";
import { Popconfirm, Tabs } from "antd";
import NextNodeList from "./nextNodeList";
import type { Field } from "../../../type";
import AddFieldModal from "./addFieldModal";
import useNodeList from "../../../../../store/nodeList";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function StartNodePanel(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  const [nodeLabel, setNodeLabel] = useState("");
  const updateNodeData = useNodeList((s) => s.updateNodeData);
  const [fields, setFields] = useState<Field[]>([]);
  const [addFieldModalProps, setAddFieldModalProps] = useState<{
    isOpen: boolean;
    type: "add" | "edit";
    initValues?: Field;
  }>({
    isOpen: false,
    type: "add",
  });

  const handleAddFiledOk = (field: Field) => {
    if (addFieldModalProps.type === "add") {
      const newFields = [{ ...field }, ...fields];
      updateNodeData(newFields, "nodeConfig.fields", nodeInfo.id);
      setFields([...newFields]);
    } else if (addFieldModalProps.type === "edit") {
      const newFields = [...fields].map((item) => {
        return item.key === field.key ? { ...item, ...field } : { ...item };
      });
      updateNodeData(newFields, "nodeConfig.fields", nodeInfo.id);
      setFields([...newFields]);
    }
  };

  const handleAdd = () => {
    setAddFieldModalProps({ isOpen: true, type: "add" });
  };

  useEffect(() => {
    setNodeLabel(props.nodeInfo.data.title);
    setFields(props.nodeInfo.data.nodeConfig?.fields || []);
  }, [props.nodeInfo]);

  const handleEditField = (record: Field) => {
    setAddFieldModalProps({ isOpen: true, type: "edit", initValues: record });
  };

  const handelDeleteField = (record: Field) => {
    const newFields = [...fields].filter((item) => item.name !== record.name);
    updateNodeData(newFields, "nodeConfig.fields", nodeInfo.id);
    setFields([...newFields]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "16px 16px 4px 16px",
          alignItems: "center",
        }}
      >
        <div>
          <img src={startNodeSvg} className={commonStyles["header-icon"]} />
        </div>
        <div style={{ marginBottom: "3px", marginLeft: "5px" }}>
          <input
            className={commonStyles["set_node_label_input"]}
            placeholder="添加标题..."
            value={nodeLabel}
          />
        </div>
      </div>
      <div style={{ padding: "4px 16px 4px 16px" }}>
        <input
          className={classNames(
            commonStyles["set_node_label_input"],
            commonStyles["set_node_desc_input"]
          )}
          placeholder="添加描述..."
        />
      </div>
      <div style={{ padding: "0 16px" }}>
        <Tabs
          items={[
            {
              label: "设置",
              key: "setting",
              children: (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ color: "#354052" }}>输入字段</div>
                    <div className={styles["add-field"]} onClick={handleAdd}>
                      +
                    </div>
                  </div>
                  <div>
                    {fields.map((item) => (
                      <div key={item.key} className={styles["field-item"]}>
                        <div>
                          <span>{item.showName}</span>
                          {!item.isSystemField && (
                            <span
                              className="inline-block ml-2.5"
                              style={{ color: "#676f83" }}
                            >
                              {item.name}
                            </span>
                          )}
                        </div>

                        <div
                          style={{ color: "#676f83" }}
                          className={
                            item.isSystemField ? "" : styles["field-content"]
                          }
                        >
                          {item.fieldType}
                        </div>
                        {!item.isSystemField && (
                          <div
                            className={classNames(styles["field-op"], "flex")}
                          >
                            <img
                              src={EditSvg}
                              className="w-4 h-4 cursor-pointer"
                              onClick={() => {
                                handleEditField(item);
                              }}
                            />
                            <Popconfirm
                              title="是否要删除？"
                              onConfirm={() => {
                                handelDeleteField(item);
                              }}
                            >
                              <img
                                src={DeleteSvg}
                                className="w-4 h-4 cursor-pointer ml-2.5"
                              />
                            </Popconfirm>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <div style={{ color: "#354052" }}>下一步</div>
                  </div>
                  <div>
                    <div style={{ color: "#676f83" }}>
                      添加此工作流程中的下一个节点{" "}
                    </div>
                    <NextNodeList
                      childrenIds={nodeInfo.data.childrenIds}
                      nodeList={nodeList}
                      nodeType={nodeInfo.type}
                      currentNodeInfo={nodeInfo}
                    />
                  </div>
                </div>
              ),
            },
            {
              label: "上次运行",
              key: "preRunning",
              children: <div>22</div>,
            },
          ]}
        />
      </div>
      <AddFieldModal
        isOpen={addFieldModalProps.isOpen}
        type={addFieldModalProps.type}
        initValues={addFieldModalProps.initValues}
        onCancel={() => {
          setAddFieldModalProps((pre) => ({ ...pre, isOpen: false }));
        }}
        allFields={fields}
        onOk={(item) => {
          console.log(item);
          handleAddFiledOk(item);
          setAddFieldModalProps((pre) => ({ ...pre, isOpen: false }));
        }}
      />
    </div>
  );
}

export default StartNodePanel;

import { Button, Modal, Space } from "antd";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init();

interface ViewProps {
  isOpen: boolean;
  originCondition?: string;
  onClose: () => void;
  onSure: (conditionStr: string) => void;
}

function AddConditionModal(props: ViewProps) {
  const [conditionStr, setConditionStr] = useState<string>("");
  const { isOpen, onClose, originCondition } = props;

  useEffect(() => {
    if (isOpen && originCondition) {
      setConditionStr(originCondition);
    } else {
      setConditionStr("");
    }
  }, [isOpen, originCondition]);
  console.log(conditionStr);
  return (
    <Modal
      open={isOpen}
      width="1200px"
      height="1000px"
      onCancel={onClose}
      footer={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary">确定</Button>
        </Space>
      }
    >
      <div style={{ marginTop: "20px" }}>
        <Editor
          height="500px"
          width="100%"
          theme="vs-dark"
          value={conditionStr}
          onChange={(value) => {
            setConditionStr(value || "");
          }}
          onMount={(editor) => {
            console.log(editor); // 查看已注册命令
            // 可尝试移除所有命令（谨慎）
          }}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
          }}
        />
      </div>
    </Modal>
  );
}

export default AddConditionModal;

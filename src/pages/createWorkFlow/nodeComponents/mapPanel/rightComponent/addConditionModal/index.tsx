import { Modal } from "antd";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
loader.config({ monaco });
interface ViewProps {
  isOpen: boolean;
  originCondition?: string;
}

function AddConditionModal(props: ViewProps) {
  const { isOpen } = props;
  return (
    <Modal open={isOpen} width="1200px" height="1000px">
      <Editor
        height="900px"
        language="qlexpress"
        theme="vs-light"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
        }}
      />
    </Modal>
  );
}

export default AddConditionModal;

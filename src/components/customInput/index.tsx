import { memo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder"; // 👈 加这个
import { BulletList, ListItem } from "@tiptap/extension-list";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import styles from "./index.module.less";

const extensions = [
  TextStyle,
  FontSize,
  TextStyleKit,
  Placeholder.configure({
    placeholder: "请输入内容...",
  }),
  StarterKit,
  Document,
  Text,
  Paragraph,
  BulletList,
  ListItem,
];

interface ViewProps {
  onChange: (v: string) => void;
}

function AnnotationNode(props: ViewProps) {
  const { onChange } = props;
  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      const value = editor.getText();
      onChange(value);
    },
  });
  return (
    <div className={styles["input-container"]}>
      <div className="flex flex-col h-full" style={{ width: "243px" }}>
        <div className="nowheel cursor-text">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

export default memo(AnnotationNode);

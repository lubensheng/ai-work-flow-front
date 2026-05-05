import classNames from "classnames";
import commonStyles from "../common.module.less";
import styles from "./index.module.less";
import type { NodeItem } from "../../../../store/nodeList";
import { memo, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";

import { BulletList, ListItem } from "@tiptap/extension-list";
import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";

import { MenuBar } from "./menu";
import { ANNOTATION_DRAG_HANDLE } from "../../constants";

const extensions = [
  TextStyleKit,
  StarterKit,
  Document,
  Text,
  Paragraph,
  BulletList,
  ListItem,
];

function AnnotationNode(props: NodeItem) {
  console.log(props);
  const boxRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions,
  });
  return (
    <div
      className={classNames(
        commonStyles["common-node-container"],
        styles.container,
        "bg-(--annotation-bg-color)!"
      )}
      ref={boxRef}
      draggable={false}
    >
      <MenuBar editor={editor} boxRef={boxRef} />
      <div className="nodrag nopan nowheel cursor-default">
        <EditorContent editor={editor} className="nodrag nopan" />
      </div>
      <div className={ANNOTATION_DRAG_HANDLE} style={{ height: "40px" }}></div>
    </div>
  );
}

export default memo(AnnotationNode);

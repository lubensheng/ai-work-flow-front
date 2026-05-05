import { Editor } from "@tiptap/core";
// import { useEditorState } from "@tiptap/react";
// import { menuBarStateSelector } from "./menuState";
import weightFont from "../../../../assets/weightFont.svg";
import toggleItalicFont from "../../../../assets/toggleItalicFont.svg";
import deleteFont from "../../../../assets/deleteFont.svg";
import listFormatFont from "../../../../assets/listFormatFont.svg";
import sureSvg from "../../../../assets/sure.svg";
import fontSizeSvg from "../../../../assets/fontSize.svg";
import linkFont from "../../../../assets/linkFont.svg";
import styles from "./index.module.less";
import { Popover, Tooltip } from "antd";
import classNames from "classnames";
import {
  ANNOTATION_BG_COLOR,
  ANNOTATION_FONT_SIZE,
  ANNOTATION_FONT_SIZE_LABEL,
} from "../../constants";
import { useState, type RefObject } from "react";

export const MenuBar = ({
  editor,
  boxRef,
}: {
  editor: Editor | null;
  boxRef: RefObject<HTMLDivElement | null>;
}) => {
  const [currentFontSize, setCurrentFontSize] = useState<string>("14px");
  // const editorState = useEditorState({
  //   editor: editor as Editor,
  //   selector: menuBarStateSelector,
  // });
  if (!editor) {
    return null;
  }

  const handleChangeBgColor = (color: string) => {
    if (boxRef.current) {
      boxRef.current.style.setProperty("--annotation-bg-color", color);
    }
  };

  return (
    <div className={styles["menu-container"]}>
      <div className={styles["item"]}>
        <Popover
          trigger="click"
          showArrow={false}
          arrow={false}
          content={
            <div className="flex w-[120px] flex-wrap">
              {ANNOTATION_BG_COLOR.map((item) => {
                return (
                  <div
                    key={item}
                    className="w-[33%] h-8 justify-center items-center flex hover:bg-black/5 cursor-pointer rounded-sm"
                    onClick={() => {
                      handleChangeBgColor(item);
                    }}
                  >
                    <div
                      className="w-4 h-4 border border-white rounded-full"
                      style={{ backgroundColor: item }}
                    ></div>
                  </div>
                );
              })}
            </div>
          }
        >
          <div className="hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center">
            <div
              className={classNames(
                ...[
                  "w-7.5 h-7.5 border border-white rounded-full bg-(--annotation-bg-color) cursor-pointer",
                ]
              )}
            ></div>
          </div>
        </Popover>
        <Popover
          trigger="click"
          placement="bottom"
          content={
            <div style={{ width: "120px" }}>
              {ANNOTATION_FONT_SIZE.map((item) => (
                <div
                  key={item.value}
                  className="cursor-pointer flex justify-between items-center"
                  style={{ fontSize: item.value }}
                  onClick={() => {
                    editor.chain().focus().setFontSize(item.value).run();
                    setCurrentFontSize(item.value);
                  }}
                >
                  <span>{item.label}</span>
                  {currentFontSize === item.value && (
                    <img src={sureSvg} className="w-[16px] h-[16px]" />
                  )}
                </div>
              ))}
            </div>
          }
        >
          <div
            onClick={() => {
              editor.commands.setBold();
            }}
            className="hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center justify-center cursor-pointer"
          >
            <img src={fontSizeSvg} className="w-[16px] h-[16px]" />
            <span style={{ fontSize: currentFontSize }}>
              {ANNOTATION_FONT_SIZE_LABEL[currentFontSize]}
            </span>
          </div>
        </Popover>

        <div
          onClick={() => {
            editor.commands.setBold();
          }}
          className="hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center justify-center cursor-pointer"
        >
          <img src={weightFont} className="w-[16px] h-[16px]" />
        </div>
        <Tooltip title="斜体">
          <div
            onClick={() => {
              editor.commands.toggleItalic();
            }}
            className="hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center justify-center cursor-pointer"
          >
            <img src={toggleItalicFont} className="w-[16px] h-[16px]" />
          </div>
        </Tooltip>
        <Tooltip title="删除线">
          <div
            onClick={() => {
              editor.commands.toggleStrike();
            }}
            className="hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center justify-center cursor-pointer"
          >
            <img src={deleteFont} className="w-[16px] h-[16px]" />
          </div>
        </Tooltip>
        <Tooltip title="无序列表">
          <div
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
            className={classNames(
              ...[
                "hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center justify-center cursor-pointer",
                editor.isActive("bulletList") ? "is-active" : "",
              ]
            )}
          >
            <img src={listFormatFont} className="w-[16px] h-[16px]" />
          </div>
        </Tooltip>
        <Tooltip title="链接">
          <div
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
            className="hover:bg-black/5 w-10 h-10 p-1 rounded-sm flex items-center justify-center cursor-pointer"
          >
            <img src={linkFont} className="w-[16px] h-[16px]" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

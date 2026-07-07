import { useEffect, useRef, useState } from "react";
import { isUndefined } from "../utils";
import styles from "./index.module.less";

interface ViewProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  initValue?: string;
}

function CustomInput(props: ViewProps) {
  const { placeholder, initValue } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [cursorLeft, setCursorLeft] = useState<string>("0px");
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isUndefined(initValue)) {
      setInputValue(initValue);
    }
  }, [initValue]);

  useEffect(() => {
    if (textRef.current && containerRef.current && inputValue) {
      const textNode = textRef.current.firstChild;
      if (!textNode) {
        return;
      }
      const range = document.createRange();
      const textLength = textNode.textContent?.length || 0;
      range.setStart(textNode, textLength);
      range.setEnd(textNode, textLength);
      const rect = range.getBoundingClientRect();
      console.log(rect);
      const containerRect = containerRef.current.getBoundingClientRect();

      // 转换成容器内相对坐标
      const left = rect.left - containerRect.left - 4;
      setCursorLeft(left + "px");
    } else {
      setCursorLeft("0px");
    }
  }, [inputValue]);

  return (
    <div className={styles["input-container"]} ref={containerRef}>
      <div className={styles["show-text"]}>
        <p ref={textRef}>
          {inputValue}
          <span className={styles["cursor"]} style={{ left: cursorLeft }}>
            ｜
          </span>
        </p>
      </div>
      {!inputValue && <div>{placeholder}</div>}
      <div>
        <input
          className={styles.input}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default CustomInput;

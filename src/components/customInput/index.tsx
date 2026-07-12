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
  const [cursorLeft, setCursorLeft] = useState<{
    left: string;
    top: string;
  }>({
    left: "0px",
    top: "2px",
  });
  const [isFocus, setIsFocus] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const calcCursorLeft = () => {
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
      const top = rect.top - containerRect.top - 2;
      const left = rect.left - containerRect.left - 4;
      setCursorLeft({
        left: left + "px",
        top: top + "px",
      });
    } else {
      setCursorLeft({
        left: "0px",
        top: "2px",
      });
    }
  };

  useEffect(() => {
    if (!isUndefined(initValue)) {
      setInputValue(initValue);
    }
  }, [initValue]);

  useEffect(() => {
    calcCursorLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={styles["input-container"]} ref={containerRef}>
      <div className={styles["show-text"]}>
        <p ref={textRef}>
          {inputValue}
          {isFocus && (
            <span
              className={styles["cursor"]}
              style={{ left: cursorLeft.left, top: cursorLeft.top }}
            >
              ｜
            </span>
          )}
        </p>
      </div>
      {!inputValue && <div>{placeholder}</div>}
      <div>
        <textarea
          ref={inputRef}
          className={styles.input}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={() => {
            setIsFocus(true);
            calcCursorLeft();
          }}
          onClick={(e) => {
            console.log(e.clientX);
            if (textRef.current) {
              const dom = textRef.current;
              const { left, top } = dom.getBoundingClientRect();
              const leftPx = e.clientX - left + "px";
              const topPx = e.clientY - top - 10 + "px";
              setCursorLeft({
                left: leftPx,
                top: topPx,
              });
            }
          }}
          onBlur={() => setIsFocus(false)}
        />
      </div>
    </div>
  );
}

export default CustomInput;

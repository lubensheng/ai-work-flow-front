import { useEffect, useState } from "react";
import styles from "./index.module.less";
import switchIcon from "../../assets/switchIcon.svg";
import classNames from "classnames";

interface ViewProps {
  options: { key: string; label: string }[];
  initValue: string;
  onSelect?: (value: string, valueInfo: { key: string; label: string }) => void;
}

function SelectPanel(props: ViewProps) {
  const { options, initValue, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelectValue, setCurrentSelectValue] = useState<string>("");

  useEffect(() => {
    const closeSelect = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", closeSelect);
    return () => {
      window.removeEventListener("click", closeSelect);
    };
  }, []);

  useEffect(() => {
    setCurrentSelectValue(initValue);
  }, [initValue]);
  return (
    <div style={{ position: "relative" }}>
      <div
        className={classNames(
          "flex",
          "items-center",
          "w-[70px]",
          "cursor-pointer",
          "p-[4px]",
          styles.hover
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((pre) => !pre);
        }}
      >
        <span>{currentSelectValue}</span>
        <img
          src={switchIcon}
          className="w-[14px] h-[14px] ml-[4px]"
          style={{ transform: `rotate(${isOpen ? 0 : -180}deg)` }}
        />
      </div>
      {isOpen && (
        <div
          onClick={(e) => {
            console.log(e.target);
            const target = e.target as HTMLDivElement;
            const dataValue = target?.getAttribute("data-value");
            if (dataValue) {
              const valueInfo = options.find(
                (item) => String(item.key) === dataValue
              );
              if (valueInfo) {
                setCurrentSelectValue(valueInfo?.label);
                onSelect?.(dataValue, valueInfo);
                setIsOpen(false);
              }
            }
          }}
          style={{
            position: "absolute",
            width: "80px",
            zIndex: 999,
            left: "-5px",
          }}
          className={styles["select-container"]}
        >
          {options.map((item) => {
            return (
              <div key={item.key} data-value={item.key} className={styles.item}>
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectPanel;

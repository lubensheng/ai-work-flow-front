import { useEffect, useRef } from "react";
import styles from "./relationLine.module.less";
import { NEXT_NODE_CONTAINER_ID } from "./constant";

function MidRelationLine() {
  const svgRef = useRef<SVGSVGElement>(null);

  const buildPath = () => {
    const svgDom = svgRef.current;
    if (!svgDom) {
      return;
    }
  };

  useEffect(() => {
    const node = document.querySelector("#" + NEXT_NODE_CONTAINER_ID);
    if (!node) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      console.log("初始化", entries);
      buildPath();
    });
    resizeObserver.observe(node);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <svg className={styles["line-svg-container"]} ref={svgRef}>
      <g>
        <path
          d="M0,18 Q12,18 12,28 L12,208 Q12,218 24,218"
          stroke-width="1"
          fill="none"
          className={styles["stroke-divider-solid"]}
        ></path>
        <rect
          x="23"
          y="216"
          width="1"
          height="4"
          className={styles["fill-divider-solid-alt"]}
        ></rect>
      </g>
    </svg>
  );
}

export default MidRelationLine;

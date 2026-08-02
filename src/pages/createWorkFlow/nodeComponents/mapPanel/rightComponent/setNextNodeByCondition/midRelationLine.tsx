import { useEffect, useRef, useState } from "react";
import styles from "./relationLine.module.less";
import { NEXT_NODE_CONTAINER_ID } from "./constant";

function MidRelationLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [h, setH] = useState(0);
  const buildPathDParams = (currentLinkDom: HTMLDivElement) => {
    const parent = document.querySelector("#" + NEXT_NODE_CONTAINER_ID)!;
    const childRect = currentLinkDom.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const distance = childRect.top - parentRect.top;
    return {
      d: `M0,18 Q12,18 12,28 L12,${distance + 20} Q12,${distance + 40} 24,${
        distance + 40
      }`,
      rectY: String(distance + 38),
    };
  };

  const buildPath = (conditionDom: HTMLDivElement) => {
    const svgDom = svgRef.current;
    if (!svgDom) {
      return;
    }
    // M0,18 Q12,18 12,28 L12,70 Q12,80 24,80
    // M0,18 Q12,18 12,28 L12,132 Q12,142 24,142
    const childrenNode = conditionDom.childNodes;
    console.log(childrenNode);
    const NS = "http://www.w3.org/2000/svg";
    childrenNode.forEach((item, index) => {
      const currentGNode = document.getElementById("svg_g_node_" + index);
      if (!currentGNode) {
        const g = document.createElementNS(NS, "g");
        g.id = "svg_g_node_" + index;
        if (index === 0) {
          const path = document.createElementNS(NS, "path");
          path.setAttribute("d", "M0,18 L24,18");
          path.setAttribute("stroke-width", "1");
          path.setAttribute("fill", "none");
          path.classList.add(styles["stroke-divider-solid"]);
          g.appendChild(path);
          const rect1 = document.createElementNS(NS, "rect");
          rect1.setAttribute("x", "0");
          rect1.setAttribute("y", "16");
          rect1.setAttribute("width", "1");
          rect1.setAttribute("height", "4");
          rect1.classList.add(styles["fill-divider-solid-alt"]);
          g.appendChild(rect1);
          const rect2 = document.createElementNS(NS, "rect");
          rect2.setAttribute("x", "23");
          rect2.setAttribute("y", "16");
          rect2.setAttribute("width", "1");
          rect2.setAttribute("height", "4");
          rect2.classList.add(styles["fill-divider-solid-alt"]);
          g.appendChild(rect2);
        } else {
          const dParams = buildPathDParams(item as HTMLDivElement);
          const path = document.createElementNS(NS, "path");
          path.setAttribute("d", dParams.d);
          path.setAttribute("stroke-width", "1");
          path.setAttribute("fill", "none");
          path.classList.add(styles["stroke-divider-solid"]);
          g.appendChild(path);
          const rect = document.createElementNS(NS, "rect");
          rect.setAttribute("x", "23");
          rect.setAttribute("y", dParams.rectY);
          rect.setAttribute("width", "1");
          rect.setAttribute("height", "4");
          rect.classList.add(styles["fill-divider-solid-alt"]);
          g.appendChild(rect);
        }
        svgDom.appendChild(g);
      } else if (index !== 0) {
        const dParams = buildPathDParams(item as HTMLDivElement);
        const pathNode = currentGNode.getElementsByTagNameNS(NS, "path")[0];
        pathNode.setAttribute("d", dParams.d);
        const rect = currentGNode.getElementsByTagNameNS(NS, "rect")[0];
        rect.setAttribute("y", dParams.rectY);
      }
    });
  };

  useEffect(() => {
    const node = document.querySelector("#" + NEXT_NODE_CONTAINER_ID);
    if (!node) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      console.log("初始化", entries);
      setH((entries[0].target as HTMLDivElement).offsetHeight);
      buildPath(entries[0].target as HTMLDivElement);
    });
    resizeObserver.observe(node);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <svg
      className={styles["line-svg-container"]}
      ref={svgRef}
      style={{ height: h + "px" }}
    ></svg>
  );
}

export default MidRelationLine;

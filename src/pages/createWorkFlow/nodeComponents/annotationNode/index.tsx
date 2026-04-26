import classNames from "classnames";
import commonStyles from "../common.module.less";
import type { NodeItem } from "../../../../store/nodeList";
import { memo } from "react";

function AnnotationNode(props: NodeItem) {
  console.log(props);
  return (
    <div className={classNames(commonStyles["common-node-container"])}>
      <div>
        <span className={commonStyles["font-styles"]}>test</span>
      </div>
    </div>
  );
}

export default memo(AnnotationNode);

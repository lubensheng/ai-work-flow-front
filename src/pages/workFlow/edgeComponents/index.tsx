import { BaseEdge, EdgeToolbar } from "@xyflow/react";
import { memo } from "react";
import { Button } from "antd";
import useClickAddPositionInfo from "../../../store/clickAddPositionInfo";

interface ViewProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  data: {
    currentEdgeInfo: {
      source: string;
      target: string;
    };
    active: boolean;
    mouseIn: boolean;
    showRelateNode: boolean;
  };

  targetY: number;
}

function EdgesComponent(props: ViewProps) {
  const { id, sourceX, sourceY, targetX, targetY, data } = props;

  const setCurrentNodeInfo = useClickAddPositionInfo(
    (state) => state.setCurrentNodeInfo
  );
  const centerX = (targetX - sourceX) / 2 + sourceX;
  const centerY = (targetY - sourceY) / 2 + sourceY;
  const edgePath = `
  M ${sourceX} ${sourceY} 
  Q ${(targetX - sourceX) * 0.2 + sourceX} ${
    targetY * 1.1
  } ${centerX} ${centerY}
  Q ${(targetX - sourceX) * 0.8 + sourceX} ${
    sourceY * 0.9
  } ${targetX} ${targetY}
  `;
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        cursor="pointer"
        style={
          data.active || data.showRelateNode
            ? { stroke: "#1296db", cursor: "pointer" }
            : { cursor: "pointer" }
        }
      />
      {data.mouseIn || data.active ? (
        <EdgeToolbar edgeId={props.id} x={centerX} y={centerY} isVisible>
          <Button
            style={{ width: "15px", height: "15px" }}
            onClick={() => {
              setCurrentNodeInfo({
                currentAddNodeInfo: {
                  position: { x: centerX, y: centerY },
                  edgeInfo: {
                    source: data.currentEdgeInfo.source,
                    target: data.currentEdgeInfo.target,
                    edgeId: id,
                  },
                  nodeInfo: undefined,
                },
              });
            }}
          >
            +
          </Button>
        </EdgeToolbar>
      ) : null}
    </>
  );
}

export default memo(EdgesComponent);

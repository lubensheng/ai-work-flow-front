import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import ConditionItem from "./conditionItem";
import type {
  NodeDataValueType,
  NodeItem,
} from "../../../../../../store/nodeList";
import type { ConditionItem as ConditionItemType } from "../../../../../../store/types/nodeListTypes";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useNodeList from "../../../../../../store/nodeList";

interface ViewProps {
  nodeInfo: NodeItem;
  nodeList: NodeItem[];
}

function ConditionList(props: ViewProps) {
  const { nodeInfo, nodeList } = props;
  const [items, setItems] = useState<ConditionItemType[]>([]);
  const updateNodeData = useNodeList((s) => s.updateNodeData);
  const handleAddCondition = () => {
    const max = Math.max(...items.map((i) => Number(i.id)));
    const newItems: ConditionItemType[] = [
      ...items,
      {
        id: String(max + 1),
        type: "ELSE IF",
      },
    ];
    updateNodeData(
      newItems as unknown as NodeDataValueType,
      "nodeConfig.conditions",
      nodeInfo.id
    );
  };

  useEffect(() => {
    if (!Array.isArray(nodeList)) {
      return;
    }
    const currentNodeInfo = nodeList.find((item) => item.id === nodeInfo.id);
    if (currentNodeInfo?.data.nodeConfig?.conditions) {
      setItems(currentNodeInfo.data.nodeConfig.conditions);
    }
  }, [nodeList, nodeInfo]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // 轻微拖动不触发，更精准
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <ConditionItem key={item.id} id={item.id} label={item.type} />
          ))}
        </SortableContext>
      </DndContext>
      <div className="mt-[20px]">
        <Button
          className="w-full"
          icon={<PlusOutlined />}
          onClick={handleAddCondition}
        >
          ELIF
        </Button>
      </div>
    </div>
  );
}

export default ConditionList;

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
} from '@dnd-kit/sortable';
import { useState } from "react";
import ConditionItem from "./conditionItem";
import type { NodeItem } from "../../../../../../store/nodeList";

interface ViewProps {
  nodeInfo: NodeItem;
}

function ConditionList(props: ViewProps) {
  const { nodeInfo } = props;
   const [items, setItems] = useState([
    { id: '1', title: 'case 1' },
    { id: '2', title: 'case 2' },
    { id: '3', title: 'case 3' },
    { id: '4', title: 'case 4' },
  ]);
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
  return <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext items={items.map(i => i.id)}  strategy={verticalListSortingStrategy}>
        {items.map((item) => (
            <ConditionItem key={item.id} id={item.id} label={item.title} />
          ))}
    </SortableContext> 
  </DndContext>
}

export default ConditionList;
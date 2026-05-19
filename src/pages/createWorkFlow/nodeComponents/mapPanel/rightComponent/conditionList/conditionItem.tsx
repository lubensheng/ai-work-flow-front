import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface ViewProps {
  label: string;
  id: string;
}

function ConditionItem(props: ViewProps) {
  const { id, label } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'default', // 整个 tab 默认不能拖动
  };
  return <div  ref={setNodeRef} style={style} {...attributes}>
      <div
        {...listeners} // 拖拽触发点
        style={{
          cursor: 'grab',
          padding: '0 4px',
          color: '#999',
          userSelect: 'none',
        }}
      >
        ⋮⋮
      </div>

      <div>{label}</div>
  </div>
}

export default ConditionItem;

interface StartNode {
  id: string;
}

type NodeProps = StartNode;

type FieldType = "text" | "number" | "file";

interface Field {
  key: string;
  fieldType: FieldType;
  name: string;
  showName: string;
  maxLength?: number;
  defaultValue?: string;
}

export type { NodeProps, Field };

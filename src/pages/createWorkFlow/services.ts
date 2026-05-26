import axios from "axios";
import type { EdgeItem, NodeItem } from "../../store/nodeList";

interface SaveParams {
  appName: string;
  appType: string;
  appDesc?: string;
  edgeList: EdgeItem[];
  nodeList: NodeItem[];
  userName: string;
  flowStatus: number;
}

export const saveFlow = (params: SaveParams) => {
  return axios.post<{ message: string; code: number }>("/flow/save", params);
};

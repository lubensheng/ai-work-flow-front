export type ContentItem = {
  conversationId: string;
  content: string;
  isFinish: boolean;
};
export type AskItem = {
  askId: string;
  relateConversationId: string;
  content: string;
};

export type ConversationItem = {
  id: string;
  contentList: ContentItem[];
  askList: AskItem[];
  converStationId?: string;
};

export type CreateConversationReq = {
  flowId: string;
}

export type HistoryConversationInfo = {
  conversationId: string;
  flowId: string;
  userId: string;
  userName: string;
}
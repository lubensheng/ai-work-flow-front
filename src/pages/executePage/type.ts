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
};

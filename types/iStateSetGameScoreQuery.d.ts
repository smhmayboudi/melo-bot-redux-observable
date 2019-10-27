export interface IStateSetGameScoreQuery {
  chat_id?: number;
  disable_edit_message?: boolean;
  force?: boolean;
  inline_message_id?: string;
  message_id?: number;
  score: number;
  user_id: number;
}

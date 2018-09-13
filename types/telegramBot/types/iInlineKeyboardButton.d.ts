import { ICallbackGame } from "../games/iCallbackGame";

export interface IInlineKeyboardButton {
  callback_data?: string;
  callback_game?: ICallbackGame;
  pay?: boolean;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  text: string;
  url?: string;
}
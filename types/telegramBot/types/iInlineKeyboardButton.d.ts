import { ICallbackGame } from "../games/iCallbackGame";
import { ILoginUrl } from "./iLoginUrl";

export interface IInlineKeyboardButton {
  callback_data?: string;
  callback_game?: ICallbackGame;
  login_url: ILoginUrl;
  pay?: boolean;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  text: string;
  url?: string;
}
export interface restrictChatMember {
  (
    chat_id: number | string,
    user_id: number,
    can_add_web_page_previews?: boolean,
    can_send_media_messages?: boolean,
    can_send_messages?: boolean,
    can_send_other_messages?: boolean,
    until_date?: number,
  ): boolean
}
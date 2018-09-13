export interface promoteChatMember {
  (
    chat_id: number | string,
    user_id: number,
    can_change_info?: boolean,
    can_delete_messages?: boolean,
    can_edit_messages?: boolean,
    can_invite_users?: boolean,
    can_pin_messages?: boolean,
    can_post_messages?: boolean,
    can_promote_members?: boolean,
    can_restrict_members?: boolean,
  ): boolean
}
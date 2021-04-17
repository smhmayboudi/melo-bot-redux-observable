import { IActionSendAnimation } from "../../types/iActionSendAnimation";
import { IStateSendAnimation } from "../../types/iStateSendAnimation";
import * as actions from "../actions";

const sendAnimation: (
  state: IStateSendAnimation | undefined,
  action: IActionSendAnimation
) => IStateSendAnimation = (
  state: IStateSendAnimation | undefined = actions.sendAnimation.initialState,
  action: IActionSendAnimation
): IStateSendAnimation => {
  switch (action.type) {
    case actions.sendAnimation.SEND_ANIMATION_ERROR:
      return { ...state, error: action.sendAnimation.error };
    case actions.sendAnimation.SEND_ANIMATION_QUERY:
      return { ...state, query: action.sendAnimation.query };
    case actions.sendAnimation.SEND_ANIMATION_RESULT:
      return { ...state, result: action.sendAnimation.result };
    default:
      return state;
  }
};

export { sendAnimation };

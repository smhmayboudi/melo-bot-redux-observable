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
      return { error: action.sendAnimation.error, query: state.query };
    case actions.sendAnimation.SEND_ANIMATION_QUERY:
      return { query: action.sendAnimation.query };
    case actions.sendAnimation.SEND_ANIMATION_RESULT:
      return { query: state.query, result: action.sendAnimation.result };
    default:
      return state;
  }
};

export { sendAnimation };

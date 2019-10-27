import { IActionSendAnimation } from "../../types/iActionSendAnimation";
import { IStateSendAnimation } from "../../types/iStateSendAnimation";

const initialState: IStateSendAnimation = {};

const SEND_ANIMATION_ERROR: string = "SEND_ANIMATION_ERROR";
const SEND_ANIMATION_QUERY: string = "SEND_ANIMATION_QUERY";
const SEND_ANIMATION_RESULT: string = "SEND_ANIMATION_RESULT";

const error: (sendAnimation: IStateSendAnimation) => IActionSendAnimation = (
  sendAnimation: IStateSendAnimation
): IActionSendAnimation => ({
  sendAnimation: {
    error: sendAnimation.error
  },
  type: SEND_ANIMATION_ERROR
});
const query: (sendAnimation: IStateSendAnimation) => IActionSendAnimation = (
  sendAnimation: IStateSendAnimation
): IActionSendAnimation => ({
  sendAnimation: {
    query: sendAnimation.query
  },
  type: SEND_ANIMATION_QUERY
});
const result: (sendAnimation: IStateSendAnimation) => IActionSendAnimation = (
  sendAnimation: IStateSendAnimation
): IActionSendAnimation => ({
  sendAnimation: {
    result: sendAnimation.result
  },
  type: SEND_ANIMATION_RESULT
});

export {
  initialState,
  SEND_ANIMATION_ERROR,
  SEND_ANIMATION_QUERY,
  SEND_ANIMATION_RESULT,
  error,
  query,
  result
};

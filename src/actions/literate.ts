import { IActionLiterate } from "../../types/iActionLiterate";
import { IStateLiterate } from "../../types/iStateLiterate";

const initialState: IStateLiterate = {};

const LITERATE_ERROR: string = "LITERATE_ERROR";
const LITERATE_QUERY: string = "LITERATE_QUERY";
const LITERATE_RESULT: string = "LITERATE_RESULT";

const error: (literate: IStateLiterate) => IActionLiterate = (
  literate: IStateLiterate
): IActionLiterate => ({
  literate: {
    error: literate.error
  },
  type: LITERATE_ERROR
});
const query: (literate: IStateLiterate) => IActionLiterate = (
  literate: IStateLiterate
): IActionLiterate => ({
  literate: {
    query: literate.query
  },
  type: LITERATE_QUERY
});
const result: (literate: IStateLiterate) => IActionLiterate = (
  literate: IStateLiterate
): IActionLiterate => ({
  literate: {
    result: literate.result
  },
  type: LITERATE_RESULT
});

export {
  initialState,
  LITERATE_ERROR,
  LITERATE_QUERY,
  LITERATE_RESULT,
  error,
  query,
  result
};

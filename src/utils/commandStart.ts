import { ICommand } from "../../types/iCommand";
import { ICommandStartGroupOptions } from "../../types/iCommandStartGroupOptions";
import { ICommandStartOptions } from "../../types/iCommandStartOptions";
import * as env from "../configs/env";
import { decode, encode } from "./string";

const separator = " ";
const stringify: (
  name: string,
  opts?: ICommandStartOptions,
  optsType?: string
) => string = (
  name: string,
  opts?: ICommandStartOptions,
  optsType?: string
): string =>
  opts !== undefined && optsType !== undefined
    ? `t.me/${env.BOT_NAME}?${name}=${encode(opts, optsType)}`
    : `t.me/${env.BOT_NAME}?${name}=hi`;
const parse: <TOpts>(cmd: string, optsType?: string) => ICommand<TOpts> = <
  TOpts
>(
  cmd: string,
  optsType?: string
): ICommand<TOpts> => {
  const cmdParts: string[] = cmd.split(separator);
  return {
    name: cmdParts[0],
    options:
      cmdParts[1] !== undefined && optsType !== undefined
        ? decode(cmdParts[1], optsType)
        : undefined
  };
};
const start: (opts?: ICommandStartOptions) => string = (
  opts?: ICommandStartOptions
): string => stringify("start", opts, "iCommandStartOptions");
const startGroup: (opts?: ICommandStartGroupOptions) => string = (
  opts?: ICommandStartGroupOptions
): string => stringify("startgroup", opts, "iCommandStartGroupOptions");

export { parse, start, startGroup, stringify };

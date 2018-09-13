import { IAnimation } from "../types/iAnimation";
import { IMessageEntity } from "../types/iMessageEntity";
import { IPhotoSize } from "../types/iPhotoSize";

export interface IGame {
    animation?: IAnimation;
    description: string;
    photo: IPhotoSize[];
    text?: string;
    text_entities?: IMessageEntity[];
    title: string;
}
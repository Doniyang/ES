/**
 * 该类使用动画及tranform实现滚动效果
 * 
 * 
 */

import Digitalizer from "./Digitalizer";
import Animation from "./Animation";

export default class AnimationTranslateRoll extends Animation implements Digitalizer{
    translate(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    scrollTo(x: number, y: number, time: number): void {
        throw new Error("Method not implemented.");
    }
}
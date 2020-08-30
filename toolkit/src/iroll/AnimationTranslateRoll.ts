/**
 * 该类使用动画及tranform实现滚动效果
 * 
 * 
 */

import Digitalizer from "./Digitalizer";

export default class AnimationTranslateRoll implements Digitalizer{
    scrollTo(x: number, y: number, time: number, easing: EaseKit.EaseOptions): void {
        throw new Error("Method not implemented.");
    }
}
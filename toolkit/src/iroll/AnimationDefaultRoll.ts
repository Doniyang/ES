/**
 * 该类使用动画实现滚动效果
 */
import Digitalizer from "./Digitalizer";

export default class AnimationDefaultRoll implements Digitalizer{
    scrollTo(x: number, y: number, time: number, easing: EaseKit.EaseOptions): void {
        throw new Error("Method not implemented.");
    }
    
}
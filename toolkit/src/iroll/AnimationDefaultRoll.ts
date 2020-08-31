/**
 * 该类使用动画实现滚动效果
 */
import Digitalizer from "./Digitalizer";
import Animation from "./Animation";

export default class AnimationDefaultRoll extends Animation implements Digitalizer{
    scrollTo(x: number, y: number, time: number): void {
        throw new Error("Method not implemented.");
    }
    
}
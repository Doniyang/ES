import Animation from "src/iroll/animation/Animation";

export default interface Factory{
    style():string;
    algorithm(k:number):number
}
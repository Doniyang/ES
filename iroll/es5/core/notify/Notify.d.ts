import { ClassicEvent } from '@niyang-es/notify';
export default class Notify {
    private notify;
    constructor();
    on(name: string, fn: ScrollKit.NotifyCallback<ClassicEvent>): void;
    off(name: string, fn?: ScrollKit.NotifyCallback<ClassicEvent>): void;
    trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>): void;
}

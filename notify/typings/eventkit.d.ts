declare namespace EventKit {
    export type EventContextOptions = null | object

    export interface EventListenerParams {
        capture?: boolean;
    }

    export interface AddEventListenerParms extends EventListenerParams {
        once?: boolean
        passive?: boolean
    }
}
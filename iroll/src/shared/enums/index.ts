export const enum RollLock {
    Auto = 0,
    Horizontal = 1,
    Vertical = 2
}

export const enum Direction {
    Zero = 0,
    Positive = 1,// move from bottom to top or right to left
    Negative = -1// on the contrary as above
}

export const enum PreventEvent {
    None = 0,
    Horizontal = 1,
    Vertical = 2
}

export const enum MouseButton {
    Left,
    Middle,
    Right
}

export const enum Probe {
    Default,
    Throttle,
    Normal,
    Realtime
}


export const enum RollState {
    Wait = 0,
    Prending = 1
}


export const enum Lock {
    Auto = 0,
    Horizontal = 1,
    Vertical = 2
}

export const enum Direction {
    Zero = 0,
    Positive = 1,// move from bottom to top or right to left
    Negative = -1// on the contrary as above
}

export const enum EventPassthrough {
    None = 'none',
    Horizontal = 'horizontal',
    Vertical = 'vertical'
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


export const enum State {
    None = 0,
    Start = 1,
    Moving = 2,
    Stop = 3,
    Cancel = 4
}



export const enum Status{
    None = 0,
    Transiting= 1,
    Aninating = 2
}
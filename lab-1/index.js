var State;
(function (State) {
    State[State["OFF"] = 0] = "OFF";
    State[State["RED"] = 1] = "RED";
    State[State["YELLOW_RED"] = 2] = "YELLOW_RED";
    State[State["GREEN"] = 3] = "GREEN";
    State[State["YELLOW"] = 4] = "YELLOW"; // S4
})(State || (State = {}));
var IncomingSignal;
(function (IncomingSignal) {
    IncomingSignal[IncomingSignal["RED"] = 0] = "RED";
    IncomingSignal[IncomingSignal["YELLOW_RED"] = 1] = "YELLOW_RED";
    IncomingSignal[IncomingSignal["GREEN"] = 2] = "GREEN";
    IncomingSignal[IncomingSignal["YELLOW"] = 3] = "YELLOW";
})(IncomingSignal || (IncomingSignal = {}));
class TrafficLight {
    get state() {
        return this._state;
    }
    constructor() {
        this._state = State.OFF;
    }
    send_signal(signal) {
        switch (signal) {
            case IncomingSignal.RED:
                this.handle_red_signal();
                break;
            case IncomingSignal.YELLOW_RED:
                this.handle_yellow_red_signal();
                break;
            case IncomingSignal.GREEN:
                this.handle_green_signal();
                break;
            case IncomingSignal.YELLOW:
                this.handle_yellow_signal();
                break;
        }
        return this.state;
    }
    handle_red_signal() {
        if (this._state == State.OFF || this._state == State.YELLOW) {
            this._state = State.RED;
        }
    }
    handle_yellow_red_signal() {
        if (this._state == State.RED) {
            this._state = State.YELLOW_RED;
        }
    }
    handle_green_signal() {
        if (this._state == State.YELLOW_RED) {
            this._state = State.GREEN;
        }
    }
    handle_yellow_signal() {
        if (this._state == State.GREEN) {
            this._state = State.YELLOW;
        }
    }
}

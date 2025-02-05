enum State {
    OFF,        // S0
    RED,        // S1
    YELLOW_RED, // S2
    GREEN,      // S3
    YELLOW      // S4
}

enum IncomingSignal {
    RED,        // T1
    YELLOW_RED, // T2
    GREEN,      // T3
    YELLOW,     // T4
}

class TrafficLight {
    private _state: State;

    public get state(): State {
        return this._state;
    }

    constructor() {
        this._state = State.OFF;
    }

    public send_signal(signal: IncomingSignal): State {
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

    private handle_red_signal(): void {
        if (this._state == State.OFF || this._state == State.YELLOW) {
            this._state = State.RED;
        }
    }

    private handle_yellow_red_signal() {
        if (this._state == State.RED) {
            this._state = State.YELLOW_RED;
        }
    }

    private handle_green_signal() {
        if (this._state == State.YELLOW_RED) {
            this._state = State.GREEN;
        }
    }

    private handle_yellow_signal() {
        if (this._state == State.GREEN) {
            this._state = State.YELLOW;
        }
    }
}


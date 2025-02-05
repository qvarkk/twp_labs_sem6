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
class TrafficLightStateMachine {
    get state() {
        return this._state;
    }
    constructor() {
        this._state = State.OFF;
    }
    sendSignal(signal) {
        switch (signal) {
            case IncomingSignal.RED:
                this.handleRedSignal();
                break;
            case IncomingSignal.YELLOW_RED:
                this.handleYellowRedSignal();
                break;
            case IncomingSignal.GREEN:
                this.handleGreenSignal();
                break;
            case IncomingSignal.YELLOW:
                this.handleYellowSignal();
                break;
        }
        return this.state;
    }
    handleRedSignal() {
        if (this._state == State.OFF || this._state == State.YELLOW) {
            this._state = State.RED;
        }
    }
    handleYellowRedSignal() {
        if (this._state == State.RED) {
            this._state = State.YELLOW_RED;
        }
    }
    handleGreenSignal() {
        if (this._state == State.YELLOW_RED) {
            this._state = State.GREEN;
        }
    }
    handleYellowSignal() {
        if (this._state == State.GREEN) {
            this._state = State.YELLOW;
        }
    }
}
class TrafficLightDomManager {
    constructor() {
        this.redCarLight = document.querySelector('#redCarLight');
        this.yellowCarLight = document.querySelector('#yellowCarLight');
        this.greenCarLight = document.querySelector('#greenCarLight');
        this.redPedestrianLight = document.querySelector('#redPedestrianLight');
        this.greenPedestrianLight = document.querySelector('#greenPedestrianLight');
        if (!this.redCarLight || !this.yellowCarLight || !this.greenCarLight ||
            !this.redPedestrianLight || !this.greenPedestrianLight) {
            alert('Not all required elements are present on page!');
        }
        this.stateMachine = new TrafficLightStateMachine();
        this.handleState();
        this._time = 0;
    }
    work() {
        setInterval(() => {
            this.handleTimer();
            this._time++;
        }, 1000);
    }
    handleTimer() {
        if (this._time == 0) {
            this.sendSignal(IncomingSignal.RED);
        }
        else if (this._time == 10) {
            this.sendSignal(IncomingSignal.YELLOW_RED);
        }
        else if (this._time == 12) {
            this.sendSignal(IncomingSignal.GREEN);
        }
        else if (this._time == 22) {
            this.sendSignal(IncomingSignal.YELLOW);
        }
        else if (this._time == 24) {
            this.sendSignal(IncomingSignal.RED);
            this._time = 0;
        }
    }
    sendSignal(signal) {
        this.stateMachine.sendSignal(signal);
        this.handleState();
    }
    handleState() {
        switch (this.stateMachine.state) {
            case State.OFF:
                this.handleOffState();
                break;
            case State.RED:
                this.handleRedState();
                break;
            case State.YELLOW_RED:
                this.handleYellowRedState();
                break;
            case State.GREEN:
                this.handleGreenState();
                break;
            case State.YELLOW:
                this.handleYellowState();
                break;
        }
    }
    handleOffState() {
        this.redCarLight.classList.add('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.greenCarLight.classList.add('inactive');
        this.redPedestrianLight.classList.add('inactive');
        this.greenPedestrianLight.classList.add('inactive');
    }
    handleRedState() {
        this.redCarLight.classList.remove('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.redPedestrianLight.classList.add('inactive');
        this.greenPedestrianLight.classList.remove('inactive');
    }
    handleYellowRedState() {
        this.yellowCarLight.classList.remove('inactive');
        this.redPedestrianLight.classList.remove('inactive');
        this.greenPedestrianLight.classList.add('inactive');
    }
    handleGreenState() {
        this.redCarLight.classList.add('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.greenCarLight.classList.remove('inactive');
    }
    handleYellowState() {
        this.yellowCarLight.classList.remove('inactive');
        this.greenCarLight.classList.add('inactive');
    }
}
let domManager = new TrafficLightDomManager();
domManager.work();

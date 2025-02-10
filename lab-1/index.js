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
var TrafficLightStateMachine = /** @class */ (function () {
    function TrafficLightStateMachine() {
        this._state = State.OFF;
    }
    Object.defineProperty(TrafficLightStateMachine.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    TrafficLightStateMachine.prototype.sendSignal = function (signal) {
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
    };
    TrafficLightStateMachine.prototype.handleRedSignal = function () {
        if (this._state == State.OFF || this._state == State.YELLOW) {
            this._state = State.RED;
        }
    };
    TrafficLightStateMachine.prototype.handleYellowRedSignal = function () {
        if (this._state == State.RED) {
            this._state = State.YELLOW_RED;
        }
    };
    TrafficLightStateMachine.prototype.handleGreenSignal = function () {
        if (this._state == State.YELLOW_RED) {
            this._state = State.GREEN;
        }
    };
    TrafficLightStateMachine.prototype.handleYellowSignal = function () {
        if (this._state == State.GREEN) {
            this._state = State.YELLOW;
        }
    };
    return TrafficLightStateMachine;
}());
var TrafficLightDomManager = /** @class */ (function () {
    function TrafficLightDomManager() {
        this.redCarLight = document.querySelector('#redCarLight');
        this.yellowCarLight = document.querySelector('#yellowCarLight');
        this.greenCarLight = document.querySelector('#greenCarLight');
        this.redPedestrianLight = document.querySelector('#redPedestrianLight');
        this.greenPedestrianLight = document.querySelector('#greenPedestrianLight');
        this.timerText = document.querySelector('#timerText');
        if (!this.redCarLight || !this.yellowCarLight || !this.greenCarLight ||
            !this.redPedestrianLight || !this.greenPedestrianLight || !this.timerText) {
            alert('Not all required elements are present on page!');
        }
        this.stateMachine = new TrafficLightStateMachine();
        this.handleState();
        this._time = -1;
    }
    TrafficLightDomManager.prototype.work = function () {
        var _this = this;
        setInterval(function () {
            _this._time++;
            _this.handleTimer();
        }, 1000);
    };
    TrafficLightDomManager.prototype.handleTimer = function () {
        this.timerText.innerHTML = "Time: ".concat(this._time);
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
            this._time = -1;
        }
    };
    TrafficLightDomManager.prototype.sendSignal = function (signal) {
        this.stateMachine.sendSignal(signal);
        this.handleState();
    };
    TrafficLightDomManager.prototype.handleState = function () {
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
    };
    TrafficLightDomManager.prototype.handleOffState = function () {
        this.redCarLight.classList.add('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.greenCarLight.classList.add('inactive');
        this.redPedestrianLight.classList.add('inactive');
        this.greenPedestrianLight.classList.add('inactive');
    };
    TrafficLightDomManager.prototype.handleRedState = function () {
        this.redCarLight.classList.remove('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.redPedestrianLight.classList.add('inactive');
        this.greenPedestrianLight.classList.remove('inactive');
    };
    TrafficLightDomManager.prototype.handleYellowRedState = function () {
        this.yellowCarLight.classList.remove('inactive');
        this.redPedestrianLight.classList.remove('inactive');
        this.greenPedestrianLight.classList.add('inactive');
    };
    TrafficLightDomManager.prototype.handleGreenState = function () {
        this.redCarLight.classList.add('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.greenCarLight.classList.remove('inactive');
    };
    TrafficLightDomManager.prototype.handleYellowState = function () {
        this.yellowCarLight.classList.remove('inactive');
        this.greenCarLight.classList.add('inactive');
    };
    return TrafficLightDomManager;
}());
var domManager = new TrafficLightDomManager();
domManager.work();

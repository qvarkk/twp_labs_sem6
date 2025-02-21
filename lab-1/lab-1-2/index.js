var State;
(function (State) {
    State[State["OFF"] = 0] = "OFF";
    State[State["RED"] = 1] = "RED";
    State[State["YELLOW_RED"] = 2] = "YELLOW_RED";
    State[State["GREEN"] = 3] = "GREEN";
    State[State["YELLOW"] = 4] = "YELLOW";
    State[State["WAIT"] = 5] = "WAIT"; // S5
})(State || (State = {}));
var IncomingSignal;
(function (IncomingSignal) {
    IncomingSignal[IncomingSignal["RED"] = 0] = "RED";
    IncomingSignal[IncomingSignal["YELLOW_RED"] = 1] = "YELLOW_RED";
    IncomingSignal[IncomingSignal["GREEN"] = 2] = "GREEN";
    IncomingSignal[IncomingSignal["YELLOW"] = 3] = "YELLOW";
    IncomingSignal[IncomingSignal["REQUEST_WALK"] = 4] = "REQUEST_WALK"; // R1
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
    TrafficLightStateMachine.prototype.receiveSignal = function (signal) {
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
            case IncomingSignal.REQUEST_WALK:
                this.handleRequestWalkSignal();
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
        if (this._state == State.GREEN || this._state == State.WAIT) {
            this._state = State.YELLOW;
        }
    };
    TrafficLightStateMachine.prototype.handleRequestWalkSignal = function () {
        var _this = this;
        if (this._state == State.GREEN) {
            this._state = State.WAIT;
            setTimeout(function () {
                _this.handleYellowSignal();
            }, 2000);
        }
    };
    return TrafficLightStateMachine;
}());
var TrafficLightDomManager = /** @class */ (function () {
    function TrafficLightDomManager() {
        var _a;
        var _this = this;
        this.STATE_DURATIONS = (_a = {},
            _a[State.OFF] = 0,
            _a[State.RED] = 10,
            _a[State.YELLOW_RED] = 2,
            _a[State.GREEN] = 10,
            _a[State.YELLOW] = 2,
            _a);
        this.redCarLight = document.querySelectorAll('#redCarLight');
        this.yellowCarLight = document.querySelectorAll('#yellowCarLight');
        this.greenCarLight = document.querySelectorAll('#greenCarLight');
        this.redPedestrianLight = document.querySelectorAll('#redPedestrianLight');
        this.greenPedestrianLight = document.querySelectorAll('#greenPedestrianLight');
        this.timerText = document.querySelectorAll('#timerText');
        this.waitText = document.querySelectorAll('#waitText');
        this.waitButton = document.querySelectorAll('#waitButton');
        if (!this.redCarLight ||
            !this.yellowCarLight ||
            !this.greenCarLight ||
            !this.redPedestrianLight ||
            !this.greenPedestrianLight ||
            !this.timerText ||
            !this.waitText ||
            !this.waitButton) {
            alert('Not all required elements are present on page!');
        }
        this.waitButton.forEach(function (btn) {
            btn.addEventListener('click', function () {
                _this.sendSignalToStateMachine(IncomingSignal.REQUEST_WALK);
            });
        });
        this.stateMachine = new TrafficLightStateMachine();
        this.handleState();
        this.elapsedTime = 0;
    }
    TrafficLightDomManager.prototype.work = function () {
        var _this = this;
        setInterval(function () {
            _this.handleTimer();
            _this.handleState();
        }, 1000);
    };
    TrafficLightDomManager.prototype.handleTimer = function () {
        var _this = this;
        if (this.stateMachine.state != State.WAIT) {
            this.elapsedTime++;
            this.timerText.forEach(function (timer) {
                timer.innerHTML = "Time: ".concat(_this.elapsedTime);
            });
            if (this.elapsedTime >= this.STATE_DURATIONS[this.stateMachine.state]) {
                this.transitionToNextState();
            }
        }
        else {
            this.elapsedTime = 0;
            this.timerText.forEach(function (timer) {
                timer.innerHTML = 'Time: ...';
            });
        }
    };
    TrafficLightDomManager.prototype.transitionToNextState = function () {
        this.elapsedTime = 0;
        switch (this.stateMachine.state) {
            case State.OFF:
                this.sendSignalToStateMachine(IncomingSignal.RED);
                break;
            case State.RED:
                this.sendSignalToStateMachine(IncomingSignal.YELLOW_RED);
                break;
            case State.YELLOW_RED:
                this.sendSignalToStateMachine(IncomingSignal.GREEN);
                break;
            case State.GREEN:
                this.sendSignalToStateMachine(IncomingSignal.YELLOW);
                break;
            case State.YELLOW:
                this.sendSignalToStateMachine(IncomingSignal.RED);
                break;
        }
    };
    TrafficLightDomManager.prototype.sendSignalToStateMachine = function (signal) {
        this.stateMachine.receiveSignal(signal);
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
            case State.WAIT:
                this.handleWaitState();
                break;
        }
    };
    TrafficLightDomManager.prototype.handleOffState = function () {
        this.redCarLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.yellowCarLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.greenCarLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.redPedestrianLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.greenPedestrianLight.forEach(function (el) { return el.classList.add('inactive'); });
    };
    TrafficLightDomManager.prototype.handleRedState = function () {
        this.redCarLight.forEach(function (el) { return el.classList.remove('inactive'); });
        this.yellowCarLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.redPedestrianLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.greenPedestrianLight.forEach(function (el) { return el.classList.remove('inactive'); });
        this.waitText.forEach(function (el) { return el.classList.remove('active'); });
    };
    TrafficLightDomManager.prototype.handleYellowRedState = function () {
        this.yellowCarLight.forEach(function (el) { return el.classList.remove('inactive'); });
        this.redPedestrianLight.forEach(function (el) { return el.classList.remove('inactive'); });
        this.greenPedestrianLight.forEach(function (el) { return el.classList.add('inactive'); });
    };
    TrafficLightDomManager.prototype.handleGreenState = function () {
        this.redCarLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.yellowCarLight.forEach(function (el) { return el.classList.add('inactive'); });
        this.greenCarLight.forEach(function (el) { return el.classList.remove('inactive'); });
    };
    TrafficLightDomManager.prototype.handleYellowState = function () {
        this.yellowCarLight.forEach(function (el) { return el.classList.remove('inactive'); });
        this.greenCarLight.forEach(function (el) { return el.classList.add('inactive'); });
    };
    TrafficLightDomManager.prototype.handleWaitState = function () {
        this.waitText.forEach(function (el) { return el.classList.add('active'); });
    };
    return TrafficLightDomManager;
}());
var domManager = new TrafficLightDomManager();
domManager.work();

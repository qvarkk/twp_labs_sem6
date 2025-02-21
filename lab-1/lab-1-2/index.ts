enum State {
    OFF,        // S0
    RED,        // S1
    YELLOW_RED, // S2
    GREEN,      // S3
    YELLOW,     // S4
    WAIT        // S5
}

enum IncomingSignal {
    RED,            // T1
    YELLOW_RED,     // T2
    GREEN,          // T3
    YELLOW,         // T4
    REQUEST_WALK    // R1
}


class TrafficLightStateMachine {
    private _state: State;

    public get state(): State {
        return this._state;
    }

    constructor() {
        this._state = State.OFF;
    }

    public receiveSignal(signal: IncomingSignal): State {
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
    }

    private handleRedSignal(): void {
        if (this._state == State.OFF || this._state == State.YELLOW) {
            this._state = State.RED;
        }
    }

    private handleYellowRedSignal(): void {
        if (this._state == State.RED) {
            this._state = State.YELLOW_RED;
        }
    }

    private handleGreenSignal(): void {
        if (this._state == State.YELLOW_RED) {
            this._state = State.GREEN;
        }
    }

    private handleYellowSignal(): void {
        if (this._state == State.GREEN || this._state == State.WAIT) {
            this._state = State.YELLOW;
        }
    }

    private handleRequestWalkSignal(): void {
        if (this._state == State.GREEN) {
            this._state = State.WAIT;
            
            setTimeout(() => {
                this.handleYellowSignal();
            }, 2000);
        }
    }
}


class TrafficLightDomManager {
    readonly redCarLight: NodeListOf<HTMLElement>;
    readonly yellowCarLight: NodeListOf<HTMLElement>;
    readonly greenCarLight: NodeListOf<HTMLElement>;

    readonly redPedestrianLight: NodeListOf<HTMLElement>;
    readonly greenPedestrianLight: NodeListOf<HTMLElement>;

    readonly timerText: NodeListOf<HTMLElement>;
    readonly waitText: NodeListOf<HTMLElement>;

    readonly waitButton: NodeListOf<HTMLElement>;

    private elapsedTime: number;
    private STATE_DURATIONS: Object = {
        [State.OFF]: 0,
        [State.RED]: 10,
        [State.YELLOW_RED]: 2,
        [State.GREEN]: 10,
        [State.YELLOW]: 2
    }

    private stateMachine: TrafficLightStateMachine;

    constructor() {
        this.redCarLight = document.querySelectorAll('#redCarLight') as NodeListOf<HTMLElement>;
        this.yellowCarLight = document.querySelectorAll('#yellowCarLight') as NodeListOf<HTMLElement>;
        this.greenCarLight = document.querySelectorAll('#greenCarLight') as NodeListOf<HTMLElement>;
        this.redPedestrianLight = document.querySelectorAll('#redPedestrianLight') as NodeListOf<HTMLElement>;
        this.greenPedestrianLight = document.querySelectorAll('#greenPedestrianLight') as NodeListOf<HTMLElement>;
        this.timerText = document.querySelectorAll('#timerText') as NodeListOf<HTMLElement>;
        this.waitText = document.querySelectorAll('#waitText') as NodeListOf<HTMLElement>;
        this.waitButton = document.querySelectorAll('#waitButton') as NodeListOf<HTMLElement>;

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
        
        this.waitButton.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sendSignalToStateMachine(IncomingSignal.REQUEST_WALK);
            });
        });

        this.stateMachine = new TrafficLightStateMachine();
        this.handleState();

        this.elapsedTime = 0;
    }

    public work(): void {
        setInterval((): void => {
            this.handleTimer();
            this.handleState();
        }, 1000);
    }

    private handleTimer(): void {
        if (this.stateMachine.state != State.WAIT) {
            this.elapsedTime++;
            this.timerText.forEach(timer => {
                timer.innerHTML = `Time: ${this.elapsedTime}`;
            });
            
            if (this.elapsedTime >= this.STATE_DURATIONS[this.stateMachine.state]) {
                this.transitionToNextState();
            }
        } else {
            this.elapsedTime = 0;
            this.timerText.forEach(timer => {
                timer.innerHTML = 'Time: ...';
            });
        }
    }

    private transitionToNextState(): void {
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
    }

    private sendSignalToStateMachine(signal: IncomingSignal): void {
        this.stateMachine.receiveSignal(signal);
    }

    private handleState(): void {
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
    }

    private handleOffState(): void {
        this.redCarLight.forEach(el => el.classList.add('inactive'))
        this.yellowCarLight.forEach(el => el.classList.add('inactive'));
        this.greenCarLight.forEach(el => el.classList.add('inactive'));
        this.redPedestrianLight.forEach(el => el.classList.add('inactive'));
        this.greenPedestrianLight.forEach(el => el.classList.add('inactive'));
    }

    private handleRedState(): void {
        this.redCarLight.forEach(el => el.classList.remove('inactive'));
        this.yellowCarLight.forEach(el => el.classList.add('inactive'));
        this.redPedestrianLight.forEach(el => el.classList.add('inactive'));
        this.greenPedestrianLight.forEach(el => el.classList.remove('inactive'));
        this.waitText.forEach(el => el.classList.remove('active'));
    }

    private handleYellowRedState(): void {
        this.yellowCarLight.forEach(el => el.classList.remove('inactive'));
        this.redPedestrianLight.forEach(el => el.classList.remove('inactive'));
        this.greenPedestrianLight.forEach(el => el.classList.add('inactive'));
    }

    private handleGreenState(): void {
        this.redCarLight.forEach(el => el.classList.add('inactive'));
        this.yellowCarLight.forEach(el => el.classList.add('inactive'));
        this.greenCarLight.forEach(el => el.classList.remove('inactive'));
    }

    private handleYellowState(): void {
        this.yellowCarLight.forEach(el => el.classList.remove('inactive'));
        this.greenCarLight.forEach(el => el.classList.add('inactive'));
    }

    private handleWaitState(): void {
        this.waitText.forEach(el => el.classList.add('active'));
    }
}

let domManager = new TrafficLightDomManager();
domManager.work();

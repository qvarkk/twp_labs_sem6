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


class TrafficLightStateMachine {
    private _state: State;

    public get state(): State {
        return this._state;
    }

    constructor() {
        this._state = State.OFF;
    }

    public sendSignal(signal: IncomingSignal): State {
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
        if (this._state == State.GREEN) {
            this._state = State.YELLOW;
        }
    }
}


class TrafficLightDomManager {
    readonly redCarLight: HTMLElement;
    readonly yellowCarLight: HTMLElement;
    readonly greenCarLight: HTMLElement;

    readonly redPedestrianLight: HTMLElement;
    readonly greenPedestrianLight: HTMLElement;

    private _time: number;

    private stateMachine: TrafficLightStateMachine;

    constructor() {
        this.redCarLight = document.querySelector('#redCarLight') as HTMLElement;
        this.yellowCarLight = document.querySelector('#yellowCarLight') as HTMLElement;
        this.greenCarLight = document.querySelector('#greenCarLight') as HTMLElement;
        this.redPedestrianLight = document.querySelector('#redPedestrianLight') as HTMLElement;
        this.greenPedestrianLight = document.querySelector('#greenPedestrianLight') as HTMLElement;

        if (!this.redCarLight || !this.yellowCarLight || !this.greenCarLight ||
            !this.redPedestrianLight || !this.greenPedestrianLight) {
            alert('Not all required elements are present on page!');
        }

        this.stateMachine = new TrafficLightStateMachine();
        this.handleState();

        this._time = -1;
    }

    public work(): void {
        setInterval((): void => {
            this._time++;
            this.handleTimer();
        }, 1000);
    }

    private handleTimer(): void {
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
    }

    private sendSignal(signal: IncomingSignal): void {
        this.stateMachine.sendSignal(signal);
        this.handleState();
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
        }
    }

    private handleOffState(): void {
        this.redCarLight.classList.add('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.greenCarLight.classList.add('inactive');
        this.redPedestrianLight.classList.add('inactive');
        this.greenPedestrianLight.classList.add('inactive');
    }

    private handleRedState(): void {
        this.redCarLight.classList.remove('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.redPedestrianLight.classList.add('inactive');
        this.greenPedestrianLight.classList.remove('inactive');
    }

    private handleYellowRedState(): void {
        this.yellowCarLight.classList.remove('inactive');
        this.redPedestrianLight.classList.remove('inactive');
        this.greenPedestrianLight.classList.add('inactive');
    }

    private handleGreenState(): void {
        this.redCarLight.classList.add('inactive');
        this.yellowCarLight.classList.add('inactive');
        this.greenCarLight.classList.remove('inactive');
    }

    private handleYellowState(): void {
        this.yellowCarLight.classList.remove('inactive');
        this.greenCarLight.classList.add('inactive');
    }
}

let domManager = new TrafficLightDomManager();
domManager.work();

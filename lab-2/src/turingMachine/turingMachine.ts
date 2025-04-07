import { Symbol } from "../types/types";

export enum State {
  q0,
  q1,
  q2,
  q3,
}

export default class TuringMachine {
  private _tape: Symbol[];
  private _headIndex: number;
  private _currentState: State;

  public get currentState(): State {
    return this._currentState;
  }

  public get currentStateString(): string {
    switch (this._currentState) {
      case State.q0:
        return "Initial state: q0";
      case State.q1:
        return "Finding + state: q1";
      case State.q2:
        return "Finding end of tape state: q2";
      case State.q3:
        return "Final state: q3";
    }
  }

  private _status: string;

  public get status(): string {
    return this._status;
  }

  constructor(
    tape: Symbol[]
  ) {
    this._tape = tape;
    this._tape.push(Symbol.BLANK);
    this._headIndex = 0;
    this._currentState = State.q0;
    this._status = "Turing Machine started";
  }

  public get headIndex(): number {
    return this._headIndex;
  }

  public getTapeLength(): number {
    return this._tape.length;
  }

  public readTape(index: number): Symbol {
    return this._tape[index];
  }

  public resetTape(tape: Symbol[]) {
    this._tape = tape;
    this._tape.push(Symbol.BLANK);
    this._headIndex = 0;
    this._currentState = State.q0;
    this._status = "Turing Machine started";
  }

  public step(): void {
    switch (this._currentState) {
      case State.q0:
        if (this._tape[this._headIndex] === "+") {
          this._status = "Read '+', changed it to '1', shifted right, changed state to q1";
          this.writeSymbol(Symbol.ONE);
          this.shiftRight();
          this.updateState(State.q1);
        } else {
          this._status = `Read '${this._tape[this._headIndex]}', left it as it is, shifted right, didn't change state`;
          this.shiftRight();
        }
        break;
      case State.q1:
        if (this._tape[this._headIndex] === " ") {
          this._status = "Read ' ', left it as it is, shifted left, changed state to q2";
          this.writeSymbol(Symbol.BLANK);
          this.shiftLeft();
          this.updateState(State.q2);
        } else {
          this._status = `Read '${this._tape[this._headIndex]}', left it as it is, shifted right, didn't change state`;
          this.shiftRight();
        }
        break;
      case State.q2:
        this._status = "Read '1', changed it to ' ', didn't shift, changed state to q3";
        this.writeSymbol(Symbol.BLANK);
        this.updateState(State.q3);
        break;
      case State.q3:
        this._status = "Turing Machine finished";
        break;
    }
  }

  private writeSymbol(symbol: Symbol): void {
    this._tape[this._headIndex] = symbol;
  }

  private shiftLeft(): void {
    this._headIndex--;
  }

  private shiftRight(): void {
    this._headIndex++;
  }

  private updateState(state: State): void {
    this._currentState = state;
  }
}

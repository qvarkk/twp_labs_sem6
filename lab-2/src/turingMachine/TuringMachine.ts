import { Symbol } from "../types/types";

export enum State {
  Q0 = "Q0. Initial state. State of searching for plus",
  Q1 = "Q1. State of returning to the first blank on the left",
  Q2 = "Q2. Transitional state of checking for '1' or '+' on the left-most symbol",
  Q3 = "Q3. State of adding '1' to the first blank on the right",
  Q4 = "Q4. Final state",
}

export default class TuringMachine {
  private _tape: Symbol[];
  private _headIndex: number;
  private _currentState: State;

  public get currentState(): State {
    return this._currentState;
  }

  constructor(
    tape: Symbol[]
  ) {
    this._tape = tape;
    this._headIndex = 0;
    this._currentState = State.Q0;
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
    this._headIndex = 0;
    this._currentState = State.Q0;
  }

  public step(): void {
    switch (this._currentState) {
      case State.Q0:
        if (this._tape[this._headIndex] === "1") {
          this.shiftRight();
        } else if (this._tape[this._headIndex] === "+") {
          this.shiftLeft();
          this.updateState(State.Q1);
        }
        break;
      case State.Q1:
        if (this._tape[this._headIndex] === " ") {
          this.shiftRight();
          this.updateState(State.Q2);
        } else {
          this.shiftLeft();
        }
        break;
      case State.Q2:
        if (this._tape[this._headIndex] === "1") {
          this.writeSymbol(Symbol.BLANK);
          this.shiftRight();
          this.updateState(State.Q3);
        } else {
          this.writeSymbol(Symbol.BLANK);
          this.updateState(State.Q4);
        }
        break;
      case State.Q3:
        if (this._tape[this._headIndex] === " ") {
          this.writeSymbol(Symbol.ONE);
          this.updateState(State.Q1);
        } else {
          this.shiftRight();
        }
        break;
      case State.Q4:
        break;
    }
  }

  private writeSymbol(symbol: Symbol): void {
    this._tape[this._headIndex] = symbol;
  }

  private shiftLeft(): void {
    if (this.headIndex == 0) {
      this._tape.unshift(Symbol.BLANK);
    } else {
      this._headIndex--;
    }
  }

  private shiftRight(): void {
    if (this.headIndex >= this._tape.length - 1) {
      this._tape.push(Symbol.BLANK);
    }

    this._headIndex++;
  }

  private updateState(state: State): void {
    this._currentState = state;
  }
}

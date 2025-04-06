import { Symbol } from "../types/types";

enum State {
  q0,
  q1,
  q2,
  q3,
}

export default class TuringMachine {
  private _tape: Symbol[];
  private _headIndex: number;
  private _currentState: State;

  constructor(
    tape: Symbol[]
  ) {
    this._tape = tape;
    this._tape.push(" ");
    this._headIndex = 0;
    this._currentState = State.q0;
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
    this._tape.push(" ");
    this._headIndex = 0;
    this._currentState = State.q0;
  }

  public step(): void {
    switch (this._currentState) {
      case State.q0:
        if (this._tape[this._headIndex] === "+") {
          this.writeSymbol("1");
          this.shiftRight();
          this.updateState(State.q1);
        } else {
          this.shiftRight();
        }
        break;
      case State.q1:
        if (this._tape[this._headIndex] === " ") {
          this.writeSymbol(" ");
          this.shiftLeft();
          this.updateState(State.q2);
        } else {
          this.shiftRight();
        }
        break;
      case State.q2:
        this.writeSymbol(" ");
        this.updateState(State.q3);
        break;
      case State.q3:
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

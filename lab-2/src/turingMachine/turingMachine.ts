import { Symbol, State, Direction, MTRule } from "../rulesets/unaryMultiplicaction";

export default class TuringMachine {
  private _tape: Symbol[];
  private _headIndex: number;
  private _currentState: State;
  private _rules: MTRule[];

  public get currentState(): State {
    return this._currentState;
  }

  constructor(tape: Symbol[], rules: MTRule[]) {
    this._tape = tape;
    this._headIndex = 0;
    this._currentState = State.Q0;
    this._rules = rules;
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
    const matchingRules = this._rules.filter(
      (rule) =>
        rule.currentState === this._currentState &&
        rule.currentSymbol === this._tape[this._headIndex]
    );

    if (matchingRules.length > 1) {
      alert(
        `Something is wrong with ruleset because 2 or more rules triggered for state ${this._currentState} with ${this._tape[this._headIndex]} symbol`
      );
      return;
    } else if (matchingRules.length === 0) return;

    const selectedRule = matchingRules[0];
    this.writeSymbol(selectedRule.newSymbol);
    this.moveHead(selectedRule.move);
    this.updateState(selectedRule.newState);
  }

  private writeSymbol(symbol: Symbol): void {
    this._tape[this._headIndex] = symbol;
  }

  private moveHead(move: Direction): void {
    switch (move) {
      case "L":
        if (this.headIndex == 0) {
          this._tape.unshift(Symbol.BLANK);
        } else {
          this._headIndex--;
        }
        break;
      case "R":
        if (this.headIndex >= this._tape.length - 1) {
          this._tape.push(Symbol.BLANK);
        }

        this._headIndex++;
        break;
      case "S":
        break;
      case "HALT":
        break;
    }
  }

  private updateState(state: State): void {
    this._currentState = state;
  }
}

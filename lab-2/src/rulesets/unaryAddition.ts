export enum State {
  Q0 = "Q0. Initial state. State of searching for plus",
  Q1 = "Q1. State of returning to the first blank on the left",
  Q2 = "Q2. Transitional state of checking for '1' or '+' on the left-most symbol",
  Q3 = "Q3. State of adding '1' to the first blank on the right",
  Q4 = "Q4. Final state",
}

export enum Symbol {
  ONE = "1",
  PLUS = "+",
  BLANK = " ",
}

export type Direction = "L" | "R" | "S" | "HALT";

export type MTRule = {
  currentState: State;
  currentSymbol: Symbol;
  newState: State;
  newSymbol: Symbol;
  move: Direction;
};

const unaryAdditionRuleset: MTRule[] = [
  {
    currentState: State.Q0,
    currentSymbol: Symbol.ONE,
    newState: State.Q0,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q0,
    currentSymbol: Symbol.PLUS,
    newState: State.Q1,
    newSymbol: Symbol.PLUS,
    move: "L"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.BLANK,
    newState: State.Q2,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.ONE,
    newState: State.Q1,
    newSymbol: Symbol.ONE,
    move: "L"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.PLUS,
    newState: State.Q1,
    newSymbol: Symbol.PLUS,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.ONE,
    newState: State.Q3,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.PLUS,
    newState: State.Q4,
    newSymbol: Symbol.BLANK,
    move: "S"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.BLANK,
    newState: State.Q1,
    newSymbol: Symbol.ONE,
    move: "S"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.ONE,
    newState: State.Q3,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.PLUS,
    newState: State.Q3,
    newSymbol: Symbol.PLUS,
    move: "R"
  },
];

export default unaryAdditionRuleset;
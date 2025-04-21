export enum State {
  Q0 = "Q0. Going right to the end of first number",
  Q1 = "Q1. Going right to the end of second number",
  Q2 = "Q2. Decrementing second number",
  Q3 = "Q3. Going left to the end of first number",
  Q4 = "Q4. Incrementing first number",
  Q5 = "Q5. Decremented to 0. Cleaning up second number",
  Q6 = "Q6. Felina"
}

export enum Symbol {
  ONE = "1",
  ZERO = "0",
  PLUS = "+",
  BLANK = " ",
}

export const finalState = State.Q6;
export const operation = Symbol.PLUS;
export const allowedCharacters = ['1', '0'];

export type Direction = "L" | "R" | "S";

export type MTRule = {
  currentState: State;
  currentSymbol: Symbol;
  newState: State;
  newSymbol: Symbol;
  move: Direction;
};

export const ruleset: MTRule[] = [
  {
    currentState: State.Q0,
    currentSymbol: Symbol.ZERO,
    newState: State.Q0,
    newSymbol: Symbol.ZERO,
    move: "R"
  },
  {
    currentState: State.Q0,
    currentSymbol: Symbol.ONE,
    newState: State.Q0,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q0,
    currentSymbol: Symbol.BLANK,
    newState: State.Q1,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.ZERO,
    newState: State.Q1,
    newSymbol: Symbol.ZERO,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.ONE,
    newState: State.Q1,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.BLANK,
    newState: State.Q2,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.ZERO,
    newState: State.Q2,
    newSymbol: Symbol.ONE,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.ONE,
    newState: State.Q3,
    newSymbol: Symbol.ZERO,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.BLANK,
    newState: State.Q5,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.ZERO,
    newState: State.Q3,
    newSymbol: Symbol.ZERO,
    move: "L"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.ONE,
    newState: State.Q3,
    newSymbol: Symbol.ONE,
    move: "L"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.BLANK,
    newState: State.Q4,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q4,
    currentSymbol: Symbol.ZERO,
    newState: State.Q0,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q4,
    currentSymbol: Symbol.ONE,
    newState: State.Q4,
    newSymbol: Symbol.ZERO,
    move: "L"
  },
  {
    currentState: State.Q4,
    currentSymbol: Symbol.BLANK,
    newState: State.Q0,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q5,
    currentSymbol: Symbol.ONE,
    newState: State.Q5,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q5,
    currentSymbol: Symbol.BLANK,
    newState: State.Q6,
    newSymbol: Symbol.BLANK,
    move: "S"
  },
];
export enum State {
  Q0 = "Q0. Initial state",
  Q1 = "Q1.",
  Q2 = "Q2.",
  Q3 = "Q3.",
  Q4 = "Q4.",
  Q5 = "Q5.",
  Q6 = "Q6.",
  Q7 = "Q7.",
  Q8 = "Q8.",
  Q9 = "Q9. Final state",
}

export enum Symbol {
  ONE = "1",
  ASTERISK = "*",
  MARK = "A",
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

// TODO: fix rules, they don't work
const unaryMultiplicationRuleset: MTRule[] = [
  {
    currentState: State.Q0,
    currentSymbol: Symbol.ONE,
    newState: State.Q0,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q0,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q1,
    newSymbol: Symbol.ASTERISK,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.ONE,
    newState: State.Q2,
    newSymbol: Symbol.MARK,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q2,
    newSymbol: Symbol.ASTERISK,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.ONE,
    newState: State.Q3,
    newSymbol: Symbol.MARK,
    move: "R"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q3,
    newSymbol: Symbol.ASTERISK,
    move: "R"
  },
  {
    currentState: State.Q3,
    currentSymbol: Symbol.MARK,
    newState: State.Q3,
    newSymbol: Symbol.MARK,
    move: "R"
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
    currentSymbol: Symbol.BLANK,
    newState: State.Q4,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q4,
    currentSymbol: Symbol.BLANK,
    newState: State.Q5,
    newSymbol: Symbol.ONE,
    move: "L"
  },
  {
    currentState: State.Q5,
    currentSymbol: Symbol.BLANK,
    newState: State.Q5,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q5,
    currentSymbol: Symbol.ONE,
    newState: State.Q5,
    newSymbol: Symbol.ONE,
    move: "L"
  },
  {
    currentState: State.Q5,
    currentSymbol: Symbol.MARK,
    newState: State.Q2,
    newSymbol: Symbol.MARK,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.MARK,
    newState: State.Q2,
    newSymbol: Symbol.MARK,
    move: "L"
  },
  {
    currentState: State.Q4,
    currentSymbol: Symbol.ONE,
    newState: State.Q4,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.BLANK,
    newState: State.Q6,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  {
    currentState: State.Q6,
    currentSymbol: Symbol.MARK,
    newState: State.Q6,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  {
    currentState: State.Q6,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q7,
    newSymbol: Symbol.ASTERISK,
    move: "R"
  },
  {
    currentState: State.Q7,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q7,
    newSymbol: Symbol.ASTERISK,
    move: "R"
  },
  {
    currentState: State.Q7,
    currentSymbol: Symbol.ONE,
    newState: State.Q2,
    newSymbol: Symbol.MARK,
    move: "L"
  },
  {
    currentState: State.Q7,
    currentSymbol: Symbol.BLANK,
    newState: State.Q8,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q8,
    currentSymbol: Symbol.MARK,
    newState: State.Q8,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q8,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q8,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q8,
    currentSymbol: Symbol.ONE,
    newState: State.Q8,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q8,
    currentSymbol: Symbol.BLANK,
    newState: State.Q9,
    newSymbol: Symbol.BLANK,
    move: "S"
  }
];

export default unaryMultiplicationRuleset;
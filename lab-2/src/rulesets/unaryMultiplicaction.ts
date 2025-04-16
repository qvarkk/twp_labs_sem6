export enum State {
  Q0 = "Q0. Finding ASTERISK",
  Q1 = "Q1. Mark right number's left-most 1",
  Q2 = "Q2. Mark left number's right-most 1",
  Q3 = "Q3. Go one cell beyond first BLANK",
  Q4 = "Q4. Copy ONE from MARK to the new position",
  Q5 = "Q5. Move to the right number",
  Q6 = "Q6. Reset left number",
  Q7 = "Q7. Erase everything that's not the result",
  Q8 = "Q8. Felina",
}

export enum Symbol {
  ONE = "1",
  ASTERISK = "*",
  MARK = "A",
  BLANK = " ",
}

export type Direction = "L" | "R" | "S";

export type MTRule = {
  currentState: State;
  currentSymbol: Symbol;
  newState: State;
  newSymbol: Symbol;
  move: Direction;
};

const unaryMultiplicationRuleset: MTRule[] = [
  // Q0. Finding * sign 
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
  // Q1. Mark right number's left-most 1
  {
    currentState: State.Q1,
    currentSymbol: Symbol.ONE,
    newState: State.Q2,
    newSymbol: Symbol.MARK,
    move: "L"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q1,
    newSymbol: Symbol.ASTERISK,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.MARK,
    newState: State.Q1,
    newSymbol: Symbol.MARK,
    move: "R"
  },
  {
    currentState: State.Q1,
    currentSymbol: Symbol.BLANK,
    newState: State.Q7,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  // Q2. Mark left number's right-most 1
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
    currentState: State.Q2,
    currentSymbol: Symbol.MARK,
    newState: State.Q2,
    newSymbol: Symbol.MARK,
    move: "L"
  },
  {
    currentState: State.Q2,
    currentSymbol: Symbol.BLANK,
    newState: State.Q6,
    newSymbol: Symbol.BLANK,
    move: "R"
  },
  // Q3. Go one cell beyond first BLANK
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
  // Q4. Copy ONE from MARK to the right-most BLANK
  {
    currentState: State.Q4,
    currentSymbol: Symbol.BLANK,
    newState: State.Q5,
    newSymbol: Symbol.ONE,
    move: "L"
  },
  {
    currentState: State.Q4,
    currentSymbol: Symbol.ONE,
    newState: State.Q4,
    newSymbol: Symbol.ONE,
    move: "R"
  },
  // Q5. Move to the right number
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
  // Q6. Reset left number
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
    newState: State.Q1,
    newSymbol: Symbol.ASTERISK,
    move: "R"
  },
  // Q7. Erase everything that's not the result
  {
    currentState: State.Q7,
    currentSymbol: Symbol.MARK,
    newState: State.Q7,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q7,
    currentSymbol: Symbol.ASTERISK,
    newState: State.Q7,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q7,
    currentSymbol: Symbol.ONE,
    newState: State.Q7,
    newSymbol: Symbol.BLANK,
    move: "L"
  },
  {
    currentState: State.Q7,
    currentSymbol: Symbol.BLANK,
    newState: State.Q8,
    newSymbol: Symbol.BLANK,
    move: "S"
  }
];

export default unaryMultiplicationRuleset;
import './style.css'
import { Symbol, State } from './rulesets/unaryMultiplicaction.ts';
import TuringMachine from './turingMachine/TuringMachine.ts';
import TuringRenderer from './turingRenderer/TuringRenderer';
import unaryMultiplicationRuleset from './rulesets/unaryMultiplicaction.ts';
import unaryAdditionRuleset from './rulesets/unaryAddition.ts';

let timeout: number | undefined = undefined;

const cellSize = 100;
const paddingX = 50;
const paddingY = 100;

let height: number = 0;
let width: number = 0;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
resizeCanvas();

const turingPosX = 25;
const turingPosY = height / 2 - cellSize / 2;

const stateText = document.querySelector('#state') as HTMLHeadingElement;

const initialTape: Symbol[] = [Symbol.ONE, Symbol.ONE, Symbol.ASTERISK, Symbol.ONE, Symbol.ONE, Symbol.ONE];

const turingMachine = new TuringMachine(initialTape, unaryMultiplicationRuleset);
const turingRenderer = new TuringRenderer(canvas, turingPosX, turingPosY, cellSize, turingMachine);
outputState();
turingRenderer.draw();


document.querySelector('#startButton')?.addEventListener('click', () => {
  const input = document.querySelector('#tapeInput') as HTMLInputElement;
  const tapeInput = input.value;

  const invalidCharsRegex = /^[1]+\+[1]+$/;
  if (!invalidCharsRegex.test(tapeInput)) {
    alert("Tape has to contain valid unary addition string. E.g.: 1+1, 11+111, etc.");
    return;
  }

  let symbolArray: Symbol[] = [];
  for (const char of tapeInput) {
    if (char === "1")
      symbolArray.push(Symbol.ONE);
    else 
      symbolArray.push(Symbol.ASTERISK);
  }

  clearInterval(timeout);
  turingMachine.resetTape(symbolArray);
  outputState();
  turingRenderer.draw();
});

document.querySelector('#autoButton')?.addEventListener('click', () => {
  timeout = setInterval(() => {
    if (turingMachine.currentState === State.Q4)
      clearInterval(timeout);

    turingMachine.step();
    outputState();
    turingRenderer.draw();
  }, 500);
});


document.querySelector('#stepButton')?.addEventListener('click', () => {
  clearInterval(timeout);
  turingMachine.step();
  outputState();
  turingRenderer.draw();
});


addEventListener('resize', () => {
  resizeCanvas();

  turingRenderer.y = height / 2 - cellSize / 2;
  turingRenderer.draw();
});

function resizeCanvas() {
  height = cellSize + paddingY;
  width = cellSize * 15 + paddingX;
//                   ^^ arbitrary number that 
//                   ^^ will fit enough cells 
//                   ^^ to show to mister Braginsky emae

  canvas.height = height;
  canvas.width = width;
}

function outputState() {
  stateText.innerHTML = turingMachine.currentState;
}
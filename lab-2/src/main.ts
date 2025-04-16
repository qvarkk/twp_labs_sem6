import './style.css'
import { Symbol, State } from './rulesets/unaryMultiplicaction.ts';
import TuringMachine from './turingMachine/TuringMachine.ts';
import TuringRenderer from './turingRenderer/TuringRenderer';
import unaryMultiplicationRuleset, { operation, allowedCharacters } from './rulesets/unaryMultiplicaction.ts';

let timeout: number | undefined = undefined;

const cellSize = 75;
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
  const inputFirst = document.querySelector('#tapeInputFirst') as HTMLInputElement;
  const inputSecond = document.querySelector('#tapeInputSecond') as HTMLInputElement;
  const valueFirst = inputFirst.value.trim();
  const valueSecond = inputSecond.value.trim();
   
  if (inputFirst.value.length === 0 || inputSecond.value.length === 0) {
    alert("Both numbers has to be present");
    return;
  }

  let symbolArray: Symbol[] = [];
  for (const char of valueFirst) {
    if (!allowedCharacters.includes(char)) {
      alert("First number has prohibited characters");
      return;
    }
    symbolArray.push(Symbol.ONE);
  }
  symbolArray.push(operation);
  for (const char of valueSecond) {
    if (!allowedCharacters.includes(char)) {
      alert("Seconds number has prohibited characters");
      return;
    } 
    symbolArray.push(Symbol.ONE);
  }

  clearInterval(timeout);
  turingMachine.resetTape(symbolArray);
  outputState();
  turingRenderer.draw();
});


document.querySelector('#autoButton')?.addEventListener('click', () => {
  timeout = setInterval(() => {
    turingMachine.step();
    outputState();
    turingRenderer.draw();
  }, 200);
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
  width = cellSize * 20 + paddingX;
//                   ^^ arbitrary number that 
//                   ^^ will fit enough cells 
//                   ^^ to show to mister Braginsky emae

  canvas.height = height;
  canvas.width = width;
}

function outputState() {
  stateText.innerHTML = turingMachine.currentState;
}
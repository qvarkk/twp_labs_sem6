import './style.css'
import TuringMachine from './turingMachine/TuringMachine.ts';
import TuringRenderer from './turingRenderer/TuringRenderer';
import { Symbol, ruleset, operation, allowedCharacters } from './rulesets/binaryAddition.ts';

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

const initialTape: Symbol[] = [Symbol.ONE, Symbol.ZERO, Symbol.BLANK, Symbol.ONE, Symbol.ZERO, Symbol.ONE];

const turingMachine = new TuringMachine(initialTape, ruleset);
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
    if (char === "1")
      symbolArray.push(Symbol.ONE);
    else
      symbolArray.push(Symbol.ZERO);
  }
  // symbolArray.push(operation);
  symbolArray.push(Symbol.BLANK);
  for (const char of valueSecond) {
    if (!allowedCharacters.includes(char)) {
      alert("Seconds number has prohibited characters");
      return;
    } 
    if (char === "1")
      symbolArray.push(Symbol.ONE);
    else
      symbolArray.push(Symbol.ZERO);
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
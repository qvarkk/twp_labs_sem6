import './style.css'
import { Symbol } from './types/types.ts';
import TuringMachine, { State } from './turingMachine/turingMachine';
import TuringRenderer from './turingRenderer/TuringRenderer';

let timeout: number | undefined = undefined;

const cellSize = 100;
let height = cellSize + 100;
let width = window.innerWidth - 100;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.height = height;
canvas.width = width;

const turingPosX = 25;
const turingPosY = height / 2 - cellSize / 2;

const stateText = document.querySelector('#state') as HTMLHeadingElement;
const statusText = document.querySelector('#status') as HTMLHeadingElement;
const turingMachine = new TuringMachine([Symbol.ONE, Symbol.PLUS, Symbol.ONE]);
const turingRenderer = new TuringRenderer(canvas, turingPosX, turingPosY, cellSize, turingMachine);
statusText.innerHTML = turingMachine.status;
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
    symbolArray.push(Symbol.PLUS);
  }

  clearInterval(timeout);
  turingMachine.resetTape(symbolArray);
  statusText.innerHTML = turingMachine.status;
  outputState();
  turingRenderer.draw();
});

document.querySelector('#autoButton')?.addEventListener('click', () => {
  timeout = setInterval(() => {
    if (turingMachine.currentState === State.q3)
      clearInterval(timeout);

    turingMachine.step();
    statusText.innerHTML = turingMachine.status;
    outputState();
    turingRenderer.draw();
  }, 2000);
});


document.querySelector('#stepButton')?.addEventListener('click', () => {
  clearInterval(timeout);
  turingMachine.step();
  statusText.innerHTML = turingMachine.status;
  outputState();
  turingRenderer.draw();
});


addEventListener('resize', () => {
  resizeCanvas();

  turingRenderer.y = height / 2 - cellSize / 2;
  turingRenderer.draw();
});

function resizeCanvas() {
  height = window.innerHeight / 2;
  width = window.innerWidth - 100;

  canvas.height = height;
  canvas.width = width;
}

function outputState() {
  stateText.innerHTML = turingMachine.currentStateString;
}
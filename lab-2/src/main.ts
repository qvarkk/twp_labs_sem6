import './style.css'
import TuringMachine from './turingMachine/turingMachine';
import TuringRenderer from './turingRenderer/TuringRenderer';

const cellSize = 100;
let height = cellSize + 100;
let width = window.innerWidth - 100;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.height = height;
canvas.width = width;

const turingPosX = 25;
const turingPosY = height / 2 - cellSize / 2;

const turingMachine = new TuringMachine(['1', '+', '1']);
const turingRenderer = new TuringRenderer(canvas, turingPosX, turingPosY, cellSize, turingMachine);
turingRenderer.draw();


document.querySelector('#startButton')?.addEventListener('click', () => {
  const input = document.querySelector('#tapeInput') as HTMLInputElement;
  const tapeInput = input.value;

  const invalidCharsRegex = /^[1]+\+[1]+$/;
  if (!invalidCharsRegex.test(tapeInput)) {
    alert("Tape has to contain valid unary addition string. E.g.: 1+1, 11+111, etc.");
    return;
  }

  // TODO: fix this bullshit
  // let symbolArray: Symbol[] = [];
  // for (const char of tapeInput) {
  //   symbolArray.push(char);
  // }

  // turingMachine.resetTape(symbolArray);
});


document.querySelector('#stepButton')?.addEventListener('click', () => {
  turingMachine.step();
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
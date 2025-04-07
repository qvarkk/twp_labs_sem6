import Cell from "../cell/Cell";
import TuringMachine from "../turingMachine/TuringMachine";


export default class TuringRenderer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  private _x: number;
  private _y: number;
  private _cellSize: number;

  public set y(value: number) {
    this._y = value;
  }

  private _turingMachine: TuringMachine;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, cellSize: number, turingMachine: TuringMachine) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d') as CanvasRenderingContext2D;

    this._x = x;
    this._y = y;
    this._cellSize = cellSize;

    this._turingMachine = turingMachine;
  }

  public draw() {
    this._context.fillStyle = 'white';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.fillStyle = 'black';

    for (let i = 0; i < this._turingMachine.getTapeLength(); i++) {
      const cell = new Cell(
        this._context, 
        this._x + i * this._cellSize, 
        this._y, 
        this._cellSize, 
        this._turingMachine.readTape(i)
      );

      cell.draw(i == this._turingMachine.headIndex);
    }
  }
}
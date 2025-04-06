import { Symbol } from "../types/types";

export default class Cell {
  private _context: CanvasRenderingContext2D;

  private _x: number;
  private _y: number;
  private _size: number;

  private _value: Symbol;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    value: Symbol
  ) {
    this._context = context;
    this._x = x;
    this._y = y;
    this._size = size;
    this._value = value;
  }

  public draw(selected: boolean = false): void {
    if (selected) {
      this._context.fillRect(this._x, this._y, this._size, this._size);
      this._context.fillStyle = 'white';
    }

    this._context.rect(this._x, this._y, this._size, this._size);
    this._context.stroke();

    const fontSize = this._size / 2;
    this._context.font = `${fontSize}px Arial`;
    this._context.fillText(
      this._value,
      this._x + this._size / 2 - fontSize / 3 + 2, // for some reason it seems to shift 2px to the left
      this._y + this._size / 2 + fontSize / 3
    );
    
    this._context.fillStyle = 'black';
  }
}

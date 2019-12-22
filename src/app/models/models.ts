export interface Coords {
  x: number;
  y: number;
}

export enum Direction {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  Stopped = ''
}

export enum EntityType {
  Nothing = 0,
  Snakehead = 1,
  Snake = 2,
  Fruit = 3
}

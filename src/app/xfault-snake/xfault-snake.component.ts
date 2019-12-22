import { Component, OnInit, HostListener } from '@angular/core';
import { Coords, Direction, EntityType } from '../models/models';
import { getRandomInt } from '../helpers/helper-functions';

@Component({
  selector: 'app-xfault-snake',
  templateUrl: './xfault-snake.component.html',
  styleUrls: ['./xfault-snake.component.scss']
})
export class XfaultSnakeComponent implements OnInit {

  public nodeWidth = 15;  // px
  public gridSize = 30;   // unit

  public direction: string; // Arrows -> [ArrowUp, ArrowDown, ArrowRight, ArrowLeft]

  public score: number;
  public grid: number[][];
  public currentCoords: Coords;
  public tail: Coords[];

  public gameOver: boolean;
  public intervalHandle: any;

  @HostListener('window:keydown', ['$event'])
  keyEvent(e: KeyboardEvent) {
    if (!this.isOppositeDirection(e.code)) {
      this.direction = e.code;
    }
  }

  constructor() { }

  public ngOnInit() {
    this.init();
  }

  public init(): void {
    this.grid = Array.from(Array(this.gridSize).fill(0), () => new Array(this.gridSize).fill(0));
    this.score = 0;
    this.gameOver = false;
    this.tail = [];
    this.direction = '';

    if (this.intervalHandle) {
      window.clearInterval(this.intervalHandle);
    }

    this.drawFruit();

    const ranCoords = this.getRandomCoords();
    let snake = this.drawSnake({x: ranCoords.x, y: ranCoords.y}, null);

    this.intervalHandle = setInterval( () => {
      if (snake) {

        switch (this.direction) {
          case Direction.Up:
            snake = this.drawSnake({x: snake.x - 1, y: snake.y}, snake);
            break;
          case Direction.Down:
            snake = this.drawSnake({x: snake.x + 1, y: snake.y}, snake);
            break;
          case Direction.Left:
            snake = this.drawSnake({x: snake.x, y: snake.y - 1}, snake);
            break;
          case Direction.Right:
            snake = this.drawSnake({x: snake.x, y: snake.y + 1}, snake);
            break;
        }
      }
    }, 100);
  }

  private drawSnake(nextSnake: Coords, currentSnake: Coords): Coords {
    if (nextSnake.x > -1 && nextSnake.y > -1 && nextSnake.x < this.gridSize && nextSnake.y < this.gridSize) {

      if (currentSnake) {
        this.clearSnake();
      }

      const nextNodeValue = this.grid[nextSnake.x][nextSnake.y];

      if (nextNodeValue === EntityType.Snake) {
        console.error('SELF_HIT');
        this.gameOver = true;
      }

      if (nextNodeValue === EntityType.Fruit) {
        this.score += 1;
        this.drawFruit();
      }

      this.currentCoords = nextSnake;



      this.grid[nextSnake.x][nextSnake.y] = EntityType.Snakehead;

      if (currentSnake) {
        this.drawTail(nextSnake);
      }

      return nextSnake;
    }

    console.error('OUT_OF_BOUNDS');
    this.gameOver = true;
  }

  private drawTail(nextPos: Coords): void {
    this.tail.push(nextPos);
    for (let z = 0; z < this.score; z++) {
      const coords = this.tail[z];
      this.grid[coords.x][coords.y] = EntityType.Snake;
    }
  }

  private drawFruit(): void {
    let coords = this.getRandomCoords();
    while (this.grid[coords.x][coords.y] !== EntityType.Nothing) {
      coords = this.getRandomCoords();
    }
    this.grid[coords.x][coords.y] = EntityType.Fruit;
  }

  private clearSnake(): void {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        if (this.grid[x][y] === EntityType.Snakehead) {
          this.grid[x][y] = EntityType.Nothing;
        }
      }
    }
    if (this.tail.length > this.score) {
      const coords = this.tail[0];
      this.grid[coords.x][coords.y] = EntityType.Nothing;
      this.tail.shift();
    }
  }

  private isOppositeDirection(nextDirection: string): boolean {
    switch (nextDirection) {
      case Direction.Up:
        return this.direction === Direction.Down;
      case Direction.Down:
        return this.direction === Direction.Up;
      case Direction.Left:
        return this.direction === Direction.Right;
      case Direction.Right:
        return this.direction === Direction.Left;
    }
  }

  private getRandomCoords(): Coords {
    const ranX = getRandomInt(0, this.gridSize - 1);
    const ranY = getRandomInt(0, this.gridSize - 1);

    return {x: ranX, y: ranY};
  }

}

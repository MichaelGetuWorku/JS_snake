import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPPED,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';

import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBord = document.getElementById('game-board');

function main(currentTime) {
  //game loop
  if (gameOver) {
    if (confirm('You lost perss ok to restart')) {
      window.location = '/';
    }
    return
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;
  //return seconds
  if (secondsSinceLastRenderTime < 1 / SNAKE_SPPED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBord.innerHTML = '';
  drawSnake(gameBord);
  drawFood(gameBord);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

const playBoard = document.querySelector(".play-board");
const score = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let x = 0;
score.innerHTML = `score: ${x}`;

let foodX, foodY;
let snakeX = 10,
  snakeY = 12;
let snakebody = [];
gameOver = false;
let velocityX = 0,
  velocityY = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `high score: ${highScore}`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(clear);
  alert("gameOver press ok to replay....");
  location.reload();
};

const changedirector = (e) => {
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
};
controls.forEach((key) => {
  key.addEventListener("click", () => changedirector({ key: key.dataset.key }));
});
const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    score.innerHTML = `score: ${++x}`;
    snakebody.push([foodX, foodY]);

    highScore = x >= highScore ? x : highScore;
    localStorage.setItem("high-score", highScore);
  }
  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  snakebody[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;
  for (let i = 0; i < snakebody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area:${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
clear = setInterval(initGame, 125);
document.addEventListener("keydown", changedirector);

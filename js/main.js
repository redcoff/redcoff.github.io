import Apple from './Apple.js'
import Snake from './Snake.js'
import Sound from './Sound.js';


const canv = document.getElementById('gameCanvas');
const ctx = canv.getContext('2d');
let storage = window.localStorage;



const GameState = {
  RUNNING: 0,
  PAUSED: 1,
  MENU: 2,
  GAMEOVER: 3
}
const state = GameState.MENU;
const Direction = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
  NONE: 4
};


let gameButt = document.getElementsByClassName("gameButt")[0];
let leaderBoardButt = document.getElementsByClassName("leaderButt")[0];

gameButt.addEventListener('click', function(){
  if(!gameButt.classList.contains("active")){
    gameButt.classList.add("active");
    leaderBoardButt.classList.remove("active");
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    let leaderBoard = document.getElementsByClassName("leaderBoard")[0];
    leaderBoard.style.display = "none";
    canv.style.display = "block";
  }
});

leaderBoardButt.addEventListener('click', function(){
  if(!leaderBoardButt.classList.contains("active")){
    leaderBoardButt.classList.add("active");
    gameButt.classList.remove("active");
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
    createLeaderboard();
  }
});

function createMainMenu() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.innerHTML = `
        <form id="startGameModal">
            <h2>Choose difficulty</h2>
            <div class="choice">
                <input type="radio" name="difficulty" value="easy" id="easy" checked>
                <label for="easy">Easy <span>(1x points)</span></label>
            </div>
            <div class="choice">
                <input type="radio" name="difficulty" value="medium" id="medium">
                <label for="medium">Medium <span>(2x points)</span></label>
            </div>
            <div class="choice">
                <input type="radio" name="difficulty" value="hard" id="hard">
                <label for="hard">Hard <span>(5x points)</span></label>
            </div>
            <button id="playButt" type="button">Start</button>
        </form>
  `;
  let playButton = document.getElementById("playButt");
  playButton.addEventListener("click", function () {
    console.log('Start game butt pressed');
    modal.style.display = "none";
    let diffValue = document.querySelector('input[name="difficulty"]:checked').value;
    let velocity = 0;
    switch (diffValue) {
      case "easy":
        velocity = 120;
        break;
      case "medium":
        velocity = 80;
        break;
      case "hard":
        velocity = 50;
        break;
    }
    startGame(velocity);
  })


}

function createGameOver() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.innerHTML = `
      <div class="modal">
        <form id="gameOverModal">
            <h2>Game over!</h2>
            <label for="nameField">Type your name: </label>
            <input type="text" name="nameField" id="nameField">
            <button id="submitButt" type="button">Submit</button>
        </form>
      </div>
  `

  let input = document.getElementById("nameField");
  let score = document.getElementById("scoreValue");
  let submitButt = document.getElementById("submitButt");
  modal.style.display = "block";
  submitButt.addEventListener("click", function() {
    storage.setItem(input.value, score.innerHTML);
    leaderBoardButt.removeAttribute("disabled");
    modal.style.display = "none";
    createLeaderboard();
    leaderBoardButt.classList.add("active");
    gameButt.classList.remove("active");
    createMainMenu();
  })
}

function startGame(difficulty) {
  let score = document.getElementById("scoreValue");
  score.innerHTML = "0";
  leaderBoardButt.setAttribute("disabled", "");
  const snake = new Snake(5, 5, difficulty);
  const apple = new Apple(3, 4);

  const soundtrack = new Sound("../soundtrackGame.mp3");
  const soundEatApple = new Sound("../eatApple.mp3");
  const soundGameOver = new Sound("../gameOver.mp3");

  soundtrack.play();

  let game = setInterval(() => {
    ctx.fillStyle = '#23272A';
    ctx.fillRect(0, 0, canv.width, canv.height);

    snake.update(apple, soundEatApple);
    apple.draw(ctx);
    snake.draw(ctx);
    if (snake.gameOver()) {
      soundtrack.stop();
      soundGameOver.play();
      clearInterval(game);
      createGameOver();
    }
  }, difficulty);

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        snake.setDirection(Direction.UP);
        e.preventDefault();
        break;
      case 40:
        snake.setDirection(Direction.DOWN);
        e.preventDefault();
        break;
      case 37:
        snake.setDirection(Direction.LEFT);
        e.preventDefault();
        break;
      case 39:
        snake.setDirection(Direction.RIGHT);
        e.preventDefault();
        break;
    }
  });
}

function createLeaderboard(){

  let leaderBoard = document.getElementsByClassName("leaderBoard")[0];
  leaderBoard.style.display = "block";
  let modal = document.getElementsByClassName("modal")[0];
  canv.style.display = "none";
  modal.style.display = "none";
  let htmlArray = [];
  let sortedData = new Map();
  sortedData = localStorageSort().reverse();

  htmlArray.push(`
  <h2>Leaderboard</h2>
  <div class="group">
      <div class="item heading">#</div>
      <div class="item heading">Name</div>
      <div class="item heading">Score</div>
    </div>
  `)

let i = 0;
  for(let [key, value] of sortedData){
    htmlArray.push(`
    <div class="group">
      <div class="item">${i+1}</div>
      <div class="item">${key}</div>
      <div class="item">${value}</div>
    </div>
  `);
  i++;
  }
 
  leaderBoard.innerHTML = htmlArray.join('');

}

function localStorageSort(){
  let map = new Map();
  for (let i = 0; i < storage.length; i++){
    map.set(storage.key(i), storage.getItem(storage.key(i)));
  }

  map[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
}

  return [...map];
}

if(gameButt.classList.contains("active")){
  createMainMenu();
} 



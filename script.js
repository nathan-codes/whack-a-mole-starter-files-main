const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start-game button');

let score = 0;
let timer = 10;
let isGameActive = false;
let countdownInterval;
let moleTimeout;
const popSound = new Audio('pop.mp3');

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function peep() {
  const hole = randomHole(holes);
  hole.classList.add('up');

  const time = randomTime(200, 1000);
  moleTimeout = setTimeout(() => {
    hole.classList.remove('up');
    if (isGameActive) {
      peep();
    }
  }, time);
}

function startGame() {
  if (isGameActive) return;

  isGameActive = true;
  score = 0;
  timer = 10;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timer;

  peep();

  countdownInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;

    if (timer === 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  isGameActive = false;
  clearInterval(countdownInterval);
  clearTimeout(moleTimeout);

  holes.forEach((hole) => {
    hole.classList.remove('up');
  });

//   alert('Game over! Your score: ' + score);
}

function bonk(event) {
  if (!event.isTrusted) return; // Avoid fake clicks

  const mole = event.target;
  if (!mole.classList.contains('up')) return; // Ignore if not an active mole

  mole.classList.remove('up');
  score++;
  scoreDisplay.textContent = score;
  popSound.currentTime = 0;
  popSound.play();
}

holes.forEach((hole) => {
  hole.addEventListener('click', bonk);
});

startButton.addEventListener('click', startGame);

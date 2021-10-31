let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const display = `${minutes}:${seconds < 10 ? '0' : '' }${seconds}`;
  document.title = `Time left: ${display}`;
  timerDisplay.textContent = display;
}

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endDisplay.textContent = `Be back at ${hours}:${minutes}`;
}

const setTimer = (e) => {
  const seconds = parseInt(e.target.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', setTimer));
document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const minutes = e.target.minutes.value;
  timer(minutes * 60);
  e.target.reset();
});
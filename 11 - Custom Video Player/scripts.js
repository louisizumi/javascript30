/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.button--fullscreen');

/* Build out functions */
const togglePlay = () => {
  if (video.paused){
    video.play();
  } else {
    video.pause(); 
  }
}

const updateButton = (e) => {
  const icon = e.target.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

const skip = (e) => {
 video.currentTime += parseFloat(e.target.dataset.skip);
}

const handleRangeUpdate = (e) => {
  video[e.target.name] = e.target.value;
}

const handleProgress = () => {
  const flexPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${flexPercent}%`;
}

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

const toggleFullscreen = (e) => {
  if (e.target.textContent === '«»') {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) { /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { /* IE11 */
      player.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}

const updateFullscreenButton = () => {
  if (fullscreenButton.textContent === '«»') {
    fullscreenButton.textContent = '»«'
  } else {
    fullscreenButton.textContent = '«»'
  }
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
fullscreenButton.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenButton);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreenButton = player.querySelector('.fullscreen');
let isRangeDragged = false;
let isProgressDragged = false;
let isFullScreen = false;

// Build functions
function handlePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }  
}

function updatePlayState() {
    const icon = this.paused ? '►' : '❚❚';
    const iconInTitle = !this.paused ? '►' : '❚❚';
    const state = this.paused ? 'paused' : 'playing';

    toggle.textContent = icon;
    document.title = `${iconInTitle} Video is ${state}`;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    if(isRangeDragged) {
        video[this.name] = this.value;
    }
}

function toggleFullscreen() {
    if(!isFullScreen) {
        if(player.requestFullscreen) {
            player.requestFullscreen(); 
        } else if(player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        } else if(player.msRequestFullscreen) {
            player.msRequestFullscreen();
        } else if(player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen(); 
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }

    this.blur();
    
}

function handleFullScreenChange() {
    isFullScreen = !isFullScreen;
    console.log({isFullScreen});
    fullScreenButton.classList.toggle('fullscreen--exit');
} 

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;

    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;  
}

function handleWindowBlur() {
    if(!video.paused) {
        video.pause();
    }
}

// Add event listners
video.addEventListener('click', handlePlay);
video.addEventListener('play', updatePlayState);
video.addEventListener('pause', updatePlayState);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', handlePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
ranges.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(slider => slider.addEventListener('mousedown', () => {
    isRangeDragged = true;
}));
ranges.forEach(slider => slider.addEventListener('mouseup', () => {
    isRangeDragged = false;
}));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isProgressDragged && scrub(e));
progress.addEventListener('mousedown', () => isProgressDragged = true);
progress.addEventListener('mouseup', () => isProgressDragged = false);

window.addEventListener('blur', handleWindowBlur);

fullScreenButton.addEventListener('click', toggleFullscreen);

if('onfullscreenchange' in document) {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
} else if('onwebkitfullscreenchange' in document) {
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
} else if('onmozfullscreenchange' in document) {
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
} else if('onmsfullscreenchange' in document) {
    document.addEventListener('msfullscreenchange', handleFullScreenChange);
}
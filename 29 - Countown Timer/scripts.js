let countdown;
const timerDisplay = document.querySelector('.display__time-left'),
      endTime = document.querySelector('.display__end-time'),
      buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft); 
    }, 1000);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60),
          remainderSeconds = seconds % 60;
          display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    document.title = timerDisplay.textContent = display;      
    console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp),
          hour = end.getHours(),
          minutes = end.getMinutes();

    endTime.textContent = `Be Back at ${hour}:${minutes < 10 ? '0' : '' }${minutes}`;      
}

function startTimer() {
    const seconds = parseInt(this.dataset.time, 10);
    timer(seconds);
}

buttons.forEach(button => {
    button.addEventListener('click', startTimer);
});

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
const minutes = parseInt(this.minutes.value, 10) * 60;
    timer(minutes);
    this.reset();
});
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){

    clearInterval(countdown);

    const now = Date.now(); // ms
    const then = now + seconds * 1000;

    console.log({now, then});

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft <= 1){
            clearInterval(countdown);
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10? '0' : ''}${remainderSeconds}`;

    timerDisplay.textContent = display;
    document.title = display;

    console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);

    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be back at ${hour > 12 ? hour-12 : hour}:${minutes < 10? '0' : ''}${minutes}${hour > 12? 'pm' : 'am'}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    this.reset();
    timer(mins*60);
});
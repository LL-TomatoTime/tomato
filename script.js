let rail = document.getElementById('rail');
let body = document.querySelector('body');

rail.addEventListener('click', ()=>{
    rail.classList.toggle('dark')
    body.classList.toggle('dark')
});

let timerDisplay = document.getElementById('timer'); //DOM for display
let startBnt = document.getElementById('start'); //DOM for start Button
const alarmSound = document.getElementById('alarm-sound'); //DOM for alarm

let timeLeft = 25 * 60; //convert 25 into seconds, for the counter decrease second per second on the display
let timerInterval = null;

function startTimer() {

    if (timerInterval !== null) return;

    timerInterval = setInterval (() => {
        if(timeLeft <= 0){ //Check if the timer has reached 0
            clearInterval(timerInterval); //Clears SetInterval ID
            timerInterval = null; // Leave it as null so it can be used again
            alert('The time is up!!');
            alarmSound.play();
            return;
        }

        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);  //convert seconds into minutes, for decrease the minutes on the display
        const seconds = timeLeft % 60 //honestly I didn't understand this command, why would I have to use '%' (I know what is '%', and how it works)
        timerDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`; //Just show it on the display
    }, 1000); //I don't know why I would have to use milliseconds instead of just seconds, but I saw this in the w3school documentation, please explain this to me
}

startBnt.addEventListener('click', startTimer);



// let pauseBtn = document.getElementById('pause');

// function pauseTimer() {
//     if (pauseBtn.addEventListener('click', pauseTimer)){
//         clearInterval(timerInterval);
//     }
// }

// let resetBtn = document.getElementById('reset');

// function resetTimer() {
//     timerDisplay.startTimer = '25:00'
// }

// reset.addEventListener('click', resetTimer);
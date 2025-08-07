let rail = document.getElementById('rail');
let body = document.querySelector('body');

rail.addEventListener('click', ()=>{
    rail.classList.toggle('dark')
    body.classList.toggle('dark')
});

let timerDisplay = document.getElementById('timer'); //DOM for display
let startBnt = document.getElementById('start'); //DOM for start Button
let pauseBtn = document.querySelector('#pause');
let resetBtn = document.querySelector('#reset');
const alarmSound = document.getElementById('alarm-sound'); //DOM for alarm

let breaktime = 1 * 6;
let breakInterval;
let breakTimeLeft = breaktime;
let focustime  
let originalTime = 1 * 4;//convert 25 into seconds, for the counter decrease second per second on the display
let timeLeft = originalTime;
let timerInterval = null;
let currentmode = 'focus';

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);  //convert seconds into minutes, for decrease the minutes on the display
    const seconds = timeLeft % 60 //honestly I didn't understand this command, why would I have to use '%' (I know what is '%', and how it works)
    timerDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`; //Just show it on the display
    timerDisplay
}

function startTimer() {

    if (timerInterval !== null) return;

    timerInterval = setInterval (() => {
        if(timeLeft <= 0){ //Check if the timer has reached 0
            clearInterval(timerInterval); //Clears SetInterval ID
            timerInterval = null; // Leave it as null so it can be used again
            alert('The time is up!!');
            switchMode();
            return;
        }

        timeLeft--;
       updateDisplay();
    }, 1000); //I don't know why I would have to use milliseconds instead of just seconds, but I saw this in the w3school documentation, please explain this to me
}

function switchMode() {
    alarmSound.play();

    // if (currentmode === 'focus') {
    //     currentmode = 'break';
    //     originalTime = breaktime; 
    //     alert("Break time is over!");
    
    // } else {
    //     currentmode = 'focus';
    //     focustime = originalTime; 
    //     alert("Break over!");
    // }
    // if (timerInterval !== null) return;

     breakInterval = setInterval (() => {
        if(breakTimeLeft <= 0){ //Check if the timer has reached 0
            clearInterval(timerInterval); //Clears SetInterval ID
            timerInterval = null; // Leave it as null so it can be used again
            alert('time Break is up!!');
            startTimer();
            return;
        }

        breakTimeLeft--;
        
       updateDisplay();
    }, 1000);
   
    // breakTimeLeft--;
    // updateDisplay();
    // // timeLeft;
    // startTimer(); 
    // return;
}

function pauseTimer(){
    if(timerInterval !== null){ //if the variable timerInterval is different from null, that is, running the time
        clearInterval(timerInterval); // this command will stop the timer
        timerInterval = null; //and this command will return the timer to default
    }
}

function resetTimer(){
    pauseTimer();
    timeLeft = originalTime;
    updateDisplay();
}

startBnt.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);



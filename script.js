let rail = document.getElementById('rail');
let body = document.querySelector('body');

rail.addEventListener('click', () => {
    rail.classList.toggle('dark');
    body.classList.toggle('dark');
});

let timerDisplay = document.getElementById('timer'); //DOM for display
let startBnt = document.getElementById('start'); //DOM for start Button
let pauseBtn = document.querySelector('#pause');
let resetBtn = document.querySelector('#reset');
const alarmSound = document.getElementById('alarm-sound'); //DOM for alarm
const focusBtn = document.getElementById('focusBtn');
const breakBtn = document.getElementById('breakBtn');
const focusTimeInput = document.getElementById('focusTime');
const breakTimeInput = document.getElementById('breakTime');
const pomodoroCounterDisplay = document.getElementById('pomodoro-counter');
const long_break = 15 * 60;
const pomodoro_until_break = 4;
const trophyContainer = document.getElementById('trophy-container');


let timeLeft;
let timerInterval = null;
let currentmode = 'focus';
let pomodoroCount = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60); //convert seconds into minutes, for decrease the minutes on the display
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`; //Just show it on the display

    if (currentmode === 'focus') {
        focusBtn.classList.add('active');
        breakBtn.classList.remove('active');
    } else {
        breakBtn.classList.add('active');
        focusBtn.classList.remove('active');
    }
}

function updateCounterDisplay() {
    pomodoroCounterDisplay.textContent = pomodoroCount;
}

function startTimer() {
    if (timerInterval !== null) return;

    if (currentmode === 'focus') {
        timeLeft = focusTimeInput.value * 60;
    } else {
        timeLeft = breakTimeInput.value * 60;
    }

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) { //Check if the timer has reached 0
            clearInterval(timerInterval); //Clears SetInterval ID
            timerInterval = null; // Leave it as null so it can be used again
            alarmSound.play();
            alert('The time is up!!');
            switchMode();
            return;
        }

        timeLeft--;
        updateDisplay();
    }, 1000); //I don't know why I would have to use milliseconds instead of just seconds, but I saw this in the w3school documentation, please explain this to me
}

function switchMode() {
    if (currentmode === 'focus') {
        pomodoroCount++;
        updateCounterDisplay();

        if (pomodoroCount % pomodoro_until_break === 0) {
            setMode('break', long_break);
        } else {
            const breakTime = breakTimeInput.value * 60;
            setMode('break', breakTime);
            alert("Let's rest a little");
        }
    } else {
        const focusTime = focusTimeInput.value * 60;
        setMode('focus', focusTime);
        alert("Shall we go back to studying?");
    }
    startTimer();
}

function pauseTimer() {
    if (timerInterval !== null) { //if the variable timerInterval is different from null, that is, running the time
        clearInterval(timerInterval); // this command will stop the timer
        timerInterval = null; //and this command will return the timer to default
    }
}

function resetTimer() {
    pauseTimer();
    const focusTime = focusTimeInput.value * 60;
    setMode('focus', focusTime);
}

function setMode(newMode, newTime) {
    if (currentmode === newMode && timeLeft === newTime) return;

    currentmode = newMode;
    pauseTimer();
    timeLeft = newTime;
    updateDisplay();
}



startBnt.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

focusBtn.addEventListener('click', () => {
    const focusTime = focusTimeInput.value * 60;
    setMode('focus', focusTime);
});
S
breakBtn.addEventListener('click', () => {
    const breakTime = breakTimeInput.value * 60;
    setMode('break', breakTime);
});

focusTimeInput.addEventListener('input', () => {
    if (currentmode === 'focus') {
        resetTimer();
    }
});

breakTimeInput.addEventListener('input', () => {
    if (currentmode === 'break') {
        const breakTime = breakTimeInput.value * 60;
        setMode('break', breakTime);
    }
});

timeLeft = focusTimeInput.value * 60;
updateDisplay();
updateCounterDisplay();
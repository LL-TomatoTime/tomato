let rail = document.getElementById('rail');
let body = document.querySelector('body');

rail.addEventListener('click', ()=>{
    rail.classList.toggle('dark')
    body.classList.toggle('dark')
});

let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let isBreak = false;
let pomodoroDuration = 25;
let breakDuration = 25;
let cycles = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
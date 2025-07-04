let rail = document.getElementById('rail');
let body = document.querySelector('body');

rail.addEventListener('click', ()=>{
    rail.classList.toggle('dark')
    body.classList.toggle('dark')
});
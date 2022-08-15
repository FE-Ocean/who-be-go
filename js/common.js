const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    main.classList.toggle('active');
});

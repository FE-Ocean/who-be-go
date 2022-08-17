const navBtn = document.querySelector('.btn-nav');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');
const navItem = document.querySelectorAll('.nav li a');

navBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    main.classList.toggle('active');
});

const activePage = window.location.pathname;
navItem.forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
        link.classList.add('selected');
    }
});

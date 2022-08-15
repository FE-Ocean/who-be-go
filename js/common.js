const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');
const navItem = document.querySelectorAll('.nav li a');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    main.classList.toggle('active');
});

function selectLink() {
    navItem.forEach((item) => item.classList.remove('selected'));
    this.classList.add('selected');
}

navItem.forEach((item) => item.addEventListener('click', selectLink));

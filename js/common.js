const navBtn = document.querySelector('.btn-nav');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');
const navItem = document.querySelectorAll('.nav li a');
// 모달
const modalAlertContainer = document.querySelector('.modal-alert-container');
const buttonCancel = document.querySelector('#btn-cancel');
const buttonLogout = document.querySelector('#btn-logout');

// 로그아웃, 로그인 li
const lastLi = nav.lastElementChild;

// 로그인되어 있는지 체크
const checkLogin = () => {
    // 추후에 토큰 검증 추가
    if (window.localStorage.getItem('token')) {
        lastLi.textContent = '로그아웃';
    } else {
        lastLi.textContent = '로그인';
    }
};

checkLogin();

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

// 모달

// 로그아웃 or 로그인
lastLi.addEventListener('click', () => {
    if (window.localStorage.getItem('token')) {
        modalAlertContainer.classList.remove('disabled');
    } else {
        // 로그아웃 테스트를 위한 임시 코드
        window.localStorage.setItem('token', '123456');
        checkLogin();
        // 로그인 페이지로 이동
        // window.location.href = '/pages/login.html';
    }
});

buttonCancel.addEventListener('click', () => {
    modalAlertContainer.classList.add('disabled');
});

buttonLogout.addEventListener('click', () => {
    window.localStorage.removeItem('token');
    checkLogin();
    modalAlertContainer.classList.remove('disabled');
    window.location.href = '/index.html';
});

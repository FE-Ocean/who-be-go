const navBtn = document.querySelector('.btn-nav');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');
const navItem = document.querySelectorAll('.nav li a');
// 모달
const modalAlertContainer = document.querySelectorAll('.modal-alert-container');
const buttonCancel = document.querySelectorAll('#btn-cancel');
const buttonLogout = document.querySelector('#btn-logout');

// 로그아웃, 로그인 li
const lastLi = nav.lastElementChild;

const logoutModal = modalAlertContainer[0];
const deleteModal = modalAlertContainer[1];

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
if (activePage != '/') {
    navItem.forEach((link) => {
        if (link.href.includes(`${activePage}`)) {
            link.classList.add('selected');
        }
    });
}

// 모달

// 로그아웃 or 로그인
lastLi.addEventListener('click', () => {
    if (window.localStorage.getItem('token')) {
        logoutModal.classList.remove('disabled');
    } else {
        window.location.href = '/pages/login.html';
    }
});

modalAlertContainer.forEach((modal) => {
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-alert-container')) {
            e.target.classList.add('disabled');
        }
    });
});

buttonCancel.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.classList.add('disabled');
    });
});

buttonLogout.addEventListener('click', () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('accountname');
    logoutModal.classList.remove('disabled');
    window.location.href = '/index.html';
});

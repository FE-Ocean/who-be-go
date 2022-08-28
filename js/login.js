import { login } from './userApi.js';
const loginForm = document.querySelector('.form-login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errMsg = document.querySelector('.msg-error');
const loginBtn = document.querySelector('.btn-L');
// 버튼 활성 상태 체크
function checkInput(e) {
    if (email.value !== '' && password.value !== '') {
        loginBtn.disabled = false;
    }
    else {
        loginBtn.disabled = true;
    }
}
loginForm.addEventListener('input', (e) => {
    checkInput(e);
});
// 로그인 체크
const Login = async (e) => {
    e.preventDefault();
    const loginData = {
        user: {
            email: email.value,
            password: password.value,
        },
    };
    try {
        const resJson = await login(loginData);
        if (resJson.status !== 422) {
            localStorage.setItem('token', resJson.user.token);
            localStorage.setItem('accountname', resJson.user.accountname);
            const previousPage = localStorage.getItem('previousPage');
            location.href = previousPage;
        }
        else {
            errMsg.classList.add('false');
        }
    }
    catch (err) {
        console.error(err);
    }
};
loginBtn.addEventListener('click', (e) => {
    Login(e);
});

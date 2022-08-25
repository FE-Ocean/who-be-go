import { login } from './userApi.js';

const loginForm = document.querySelector('.form-login') as HTMLFormElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;
const errMsg = document.querySelector('.msg-error') as HTMLElement;
const loginBtn = document.querySelector('.btn-L') as HTMLButtonElement;

// 버튼 활성 상태 체크
function checkInput(e: Event) {
    if (email.value !== '' && password.value !== '') {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

loginForm.addEventListener('input', (e: Event) => {
    checkInput(e);
});

// 로그인 체크
const Login = async (e: Event) => {
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
            location.href = '../index.html';
        } else {
            errMsg.classList.add('false');
        }
    } catch (err) {
        console.error(err);
    }
};

loginBtn.addEventListener('click', (e: Event) => {
    Login(e);
});

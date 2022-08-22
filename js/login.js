var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MANDARIN_URL } from './BASE_URL.js';
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
const Login = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const loginData = {
        user: {
            email: email.value,
            password: password.value,
        },
    };
    try {
        const res = yield fetch(MANDARIN_URL + '/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const resJson = yield res.json();
        if (resJson.status !== 422) {
            localStorage.setItem('token', resJson.user.token);
            location.href = '../index.html';
        }
        else {
            errMsg.classList.add('false');
        }
    }
    catch (err) {
        console.error(err);
    }
});
loginBtn.addEventListener('click', (e) => {
    Login(e);
});

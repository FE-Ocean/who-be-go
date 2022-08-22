import { MANDARIN_URL } from './BASE_URL.js';

const signUpForm = document.querySelector('#form-signup') as HTMLFormElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;
const errorEmail = document.querySelector('.msg-error.email') as HTMLElement;
const errorPassword = document.querySelector(
    '.msg-error.password'
) as HTMLElement;
const nextBtn = document.querySelector('#btn-next') as HTMLButtonElement;

//이메일 주소 유효성 검사
const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,5}$/i;

// 이메일 검증
async function checkEmailValid(email: string) {
    const reqData = {
        user: {
            email: email,
        },
    };
    if (checkEmail.test(email)) {
        try {
            const res = await fetch(MANDARIN_URL + '/user/emailvalid', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(reqData),
            });

            const reqJson = await res.json();

            const reqMsg: string = reqJson.message;
            if (reqMsg === '사용 가능한 이메일 입니다.') {
                errorEmail.innerText = '*' + reqMsg;
                errorEmail.classList.remove('false');
                errorEmail.classList.add('true');
                return true;
            } else {
                // 이미 가입된 이메일 주소 입니다.
                errorEmail.innerText = '*' + reqMsg;
                errorEmail.classList.add('false');
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        errorEmail.innerText = '*이메일 형식이 올바르지 않습니다.';
        errorEmail.classList.add('false');
        return false;
    }
}

//비밀번호 검증
function checkPasswordValid(password: string) {
    if (password.length > 5) {
        return true;
    } else {
        return false;
    }
}

//버튼 활성화 함수
async function btnCheckValid() {
    const emailCheckedResult = await checkEmailValid(email.value);
    const passwordCheckedResult = checkPasswordValid(password.value);

    if (emailCheckedResult && passwordCheckedResult) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

signUpForm.addEventListener('input', (e: Event) => {
    e.preventDefault();
    btnCheckValid();
});

password.addEventListener('input', (e: Event) => {
    e.preventDefault();
    if (checkPasswordValid(password.value)) {
        errorPassword.classList.remove('false');
        errorPassword.classList.add('true');
    } else {
        errorPassword.classList.add('false');
        errorPassword.innerText = '*비밀번호는 6~16자 이내로 입력해 주세요.';
    }
});

//다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('프로필 설정으로 이동');
});

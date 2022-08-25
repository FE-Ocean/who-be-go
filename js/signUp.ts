import { handleUploadImage } from './imageApi.js';
import { getEmailValidMsg, getIdValidMsg, signUp } from './userApi.js';

const signUpForm = document.querySelector('#form-signup') as HTMLFormElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;
const checkPassword = document.querySelector('#check') as HTMLInputElement;
const errorEmail = document.querySelector('.msg-error.email') as HTMLElement;
const errorPassword = document.querySelector(
    '.msg-error.password'
) as HTMLElement;
const checkMsg = document.querySelector('.msg-error.check') as HTMLElement;
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
            const reqMsg: string = await getEmailValidMsg(reqData);
            if (reqMsg === '사용 가능한 이메일 입니다.') {
                errorEmail.textContent = '*' + reqMsg;
                errorEmail.classList.remove('false');
                errorEmail.classList.add('true');
                return true;
            } else {
                // 이미 가입된 이메일 주소 입니다.
                errorEmail.textContent = '*' + reqMsg;
                errorEmail.classList.add('false');
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        errorEmail.textContent = '*이메일 형식이 올바르지 않습니다.';
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
//비밀번호 일치 검증
function checkPasswordCorrect(password: string, check: string) {
    const checkPassword = password;
    const checkCorr = check;
    if (checkPassword === checkCorr) {
        return true;
    } else {
        return false;
    }
}

//버튼 활성화 함수
async function btnCheckValid() {
    const emailCheckedResult = await checkEmailValid(email.value);
    const passwordCheckedResult = checkPasswordCorrect(
        password.value,
        checkPassword.value
    );

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
        errorPassword.textContent = '*비밀번호는 6~16자 이내로 입력해 주세요.';
    }
});

checkPassword.addEventListener('input', (e: Event) => {
    e.preventDefault();
    if (checkPasswordCorrect(password.value, checkPassword.value)) {
        checkMsg.textContent = '';
        checkMsg.classList.add('true');
        checkMsg.classList.remove('false');
    } else {
        checkMsg.classList.add('false');
        checkMsg.textContent = '*비밀번호가 일치하지 않습니다.';
    }
});

//nextBtn 클릭시 프로필 설정 섹션으로 전환
const signUpSection = document.querySelector('.section-signup') as HTMLElement;
const profileSection = document.querySelector(
    '.section-profile'
) as HTMLElement;

nextBtn.addEventListener('click', (e: Event) => {
    e.preventDefault();
    signUpSection.style.display = 'none';
    profileSection.style.display = 'flex';
});

const profileForm = document.querySelector('#form-profile') as HTMLFormElement;
const imgBtn = document.querySelector('#choose-img') as HTMLInputElement;
const thumbnailImg = document.querySelector(
    '.wrapper-upload-img'
) as HTMLDivElement;
const name = document.querySelector('#name') as HTMLInputElement;
const id = document.querySelector('#user-id') as HTMLInputElement;
const intro = document.querySelector('#intro') as HTMLInputElement;
const errorName = document.querySelector('.msg-error.username') as HTMLElement;
const errorId = document.querySelector('.msg-error.userid') as HTMLElement;
const startBtn = document.querySelector('.btn-start') as HTMLButtonElement;

// 버튼 활성화 함수
async function checkBtn() {
    const nameCheckedResult = checkNameValid(name.value);
    const idCheckedResult = await checkIdValid(id.value);
    if (nameCheckedResult && idCheckedResult) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}

profileForm.addEventListener('input', () => {
    checkBtn();
});

// name 체크
function checkNameValid(name: string) {
    if (name == '') {
        errorName.textContent = '*사용자 이름은 필수 입력사항 입니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        return false;
    } else if (name.length < 2 || name.length > 11) {
        errorName.textContent = '*사용자 이름은 2~10자 이내여야 합니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        return false;
    } else {
        errorName.classList.remove('false');
        return true;
    }
}

// id 체크, 검증
async function checkIdValid(id: string) {
    try {
        const regex = /^[a-zA-Z0-9_.]{1,10}$/;
        if (id == '') {
            errorId.textContent = '*계정ID는 필수 입력사항 입니다.';
            errorId.classList.remove('true');
            errorId.classList.add('false');
            return false;
        } else if (!regex.test(id)) {
            errorId.textContent =
                '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
            errorId.classList.remove('true');
            errorId.classList.add('false');
            return false;
        }

        const idData = {
            user: {
                accountname: id,
            },
        };
        const resMsg: string = await getIdValidMsg(idData);

        if (resMsg === '사용 가능한 계정ID 입니다.') {
            errorId.textContent = '*' + resMsg;
            errorId.classList.remove('false');
            errorId.classList.add('true');
            return true;
        } else if (resMsg === '이미 가입된 계정ID 입니다.') {
            errorId.textContent = '*' + resMsg;
            errorId.classList.remove('true');
            errorId.classList.add('false');
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}

// 이미지 업로드
async function uploadImg(e: Event) {
    try {
        const target = e.target as HTMLInputElement;
        if (target.files !== null) {
            const file = target.files[0];
            const imgURL = await handleUploadImage(file);
            thumbnailImg.style.backgroundImage = `url(${imgURL})`;
        }
    } catch (err) {
        console.error(err);
    }
}

imgBtn.addEventListener('change', (e: Event) => {
    uploadImg(e);
});

// 유저 정보 post
async function userInfo(e: Event) {
    e.preventDefault();
    const image =
        thumbnailImg.style.backgroundImage !== ''
            ? thumbnailImg.style.backgroundImage
            : '../../assets/icons/default-logo.svg';
    const reqData = {
        user: {
            username: name.value,
            email: email.value,
            password: password.value,
            accountname: id.value,
            intro: intro.value,
            image: image,
        },
    };

    try {
        const resMsg = await signUp(reqData);
        if (resMsg === '회원가입 성공') {
            location.href = './login.html';
        }
    } catch (err) {
        console.error(err);
    }
}

startBtn.addEventListener('click', (e: Event) => {
    userInfo(e);
});

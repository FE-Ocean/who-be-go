import { handleUploadImage } from '../api/imageApi.js';
import { getEmailValidMsg, getIdValidMsg, signUp } from '../api/userApi.js';
const signUpForm = document.querySelector('#form-signup');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const checkPassword = document.querySelector('#check');
const errorEmail = document.querySelector('.msg-error.email');
const errorPassword = document.querySelector('.msg-error.password');
const checkMsg = document.querySelector('.msg-error.check');
const nextBtn = document.querySelector('#btn-next');
//이메일 주소 유효성 검사
const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,5}$/i;
// 이메일 검증
async function checkEmailValid(email) {
    const reqData = {
        user: {
            email: email,
        },
    };
    if (checkEmail.test(email)) {
        try {
            const reqMsg = await getEmailValidMsg(reqData);
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
function checkPasswordValid(password) {
    if (password.length > 5) {
        return true;
    } else {
        return false;
    }
}
//비밀번호 일치 검증
function checkPasswordCorrect(password, check) {
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
    const passwordCheckedResult =
        checkPasswordValid(password.value) &&
        checkPasswordCorrect(password.value, checkPassword.value);
    if (emailCheckedResult && passwordCheckedResult) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}
signUpForm.addEventListener('input', (e) => {
    e.preventDefault();
    btnCheckValid();
});
password.addEventListener('input', (e) => {
    e.preventDefault();
    if (checkPasswordValid(password.value)) {
        errorPassword.classList.remove('false');
        errorPassword.classList.add('true');
    } else {
        errorPassword.classList.add('false');
        errorPassword.textContent = '*비밀번호는 6~16자 이내로 입력해 주세요.';
    }
});
checkPassword.addEventListener('input', (e) => {
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
const signUpSection = document.querySelector('.section-signup');
const profileSection = document.querySelector('.section-profile');
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpSection.style.display = 'none';
    profileSection.style.display = 'flex';
});
const profileForm = document.querySelector('#form-profile');
const imgBtn = document.querySelector('#choose-img');
const profileImg = document.querySelector('#img-profile');
const name = document.querySelector('#name');
const id = document.querySelector('#user-id');
const intro = document.querySelector('#intro');
const errorName = document.querySelector('.msg-error.username');
const errorId = document.querySelector('.msg-error.userid');
const startBtn = document.querySelector('.btn-start');
let joinButtonValid = {
    name: false,
    id: false,
};
// 버튼 활성화 함수
async function checkBtn() {
    if (joinButtonValid.name && joinButtonValid.id) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}
// name 체크
function checkNameValid(name) {
    if (name == '') {
        errorName.textContent = '*사용자 이름은 필수 입력사항 입니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        joinButtonValid.name = false;
    } else if (name.length < 2 || name.length > 11) {
        errorName.textContent = '*사용자 이름은 2~10자 이내여야 합니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        joinButtonValid.name = false;
    } else {
        errorName.classList.remove('false');
        joinButtonValid.name = true;
    }
}
name.addEventListener('input', () => {
    checkNameValid(name.value);
    checkBtn();
});
// id 체크, 검증
async function checkIdValid(id) {
    try {
        const regex = /^[a-zA-Z0-9_.]{1,10}$/;
        if (id == '') {
            errorId.textContent = '*계정ID는 필수 입력사항 입니다.';
            errorId.classList.remove('true');
            errorId.classList.add('false');
            joinButtonValid.id = false;
            return;
        } else if (!regex.test(id)) {
            errorId.textContent =
                '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
            errorId.classList.remove('true');
            errorId.classList.add('false');
            joinButtonValid.id = false;
            return;
        }
        const idData = {
            user: {
                accountname: id,
            },
        };
        const resMsg = await getIdValidMsg(idData);
        if (resMsg === '사용 가능한 계정ID 입니다.') {
            errorId.textContent = '*' + resMsg;
            errorId.classList.remove('false');
            errorId.classList.add('true');
            joinButtonValid.id = true;
            return;
        } else if (resMsg === '이미 가입된 계정ID 입니다.') {
            errorId.textContent = '*' + resMsg;
            errorId.classList.remove('true');
            errorId.classList.add('false');
            joinButtonValid.id = false;
            return;
        }
    } catch (err) {
        console.error(err);
    }
}
id.addEventListener('input', async () => {
    await checkIdValid(id.value);
    checkBtn();
});
// 이미지 업로드
async function uploadImg(e) {
    try {
        const target = e.target;
        if (target.files !== null) {
            const file = target.files[0];
            const imgURL = await handleUploadImage(file);
            profileImg.src = imgURL;
        }
    } catch (err) {
        console.error(err);
    }
}
imgBtn.addEventListener('change', (e) => {
    uploadImg(e);
});
// 유저 정보 post
async function userInfo(e) {
    e.preventDefault();
    const image =
        profileImg.src !== ''
            ? profileImg.src
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
            location.href = './moveLogin.html';
        }
    } catch (err) {
        console.error(err);
    }
}
startBtn.addEventListener('click', (e) => {
    userInfo(e);
});

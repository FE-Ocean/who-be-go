var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleUploadImage } from './imageApi.js';
import { getEmailValidMsg, getIdValidMsg, signUp } from './userApi.js';
const signUpForm = document.querySelector('#form-signup');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const checkPassword = document.querySelector('#check');
const errorEmail = document.querySelector('.msg-error.email');
const errorPassword = document.querySelector('.msg-error.password');
const checkMsg = document.querySelector('.msg-error.check');
const nextBtn = document.querySelector('#btn-next');
//이메일 주소 유효성 검사
const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,5}$/i;
// 이메일 검증
function checkEmailValid(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqData = {
            user: {
                email: email,
            },
        };
        if (checkEmail.test(email)) {
            try {
                const reqMsg = yield getEmailValidMsg(reqData);
                if (reqMsg === '사용 가능한 이메일 입니다.') {
                    errorEmail.innerText = '*' + reqMsg;
                    errorEmail.classList.remove('false');
                    errorEmail.classList.add('true');
                    return true;
                }
                else {
                    // 이미 가입된 이메일 주소 입니다.
                    errorEmail.innerText = '*' + reqMsg;
                    errorEmail.classList.add('false');
                    return false;
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            errorEmail.innerText = '*이메일 형식이 올바르지 않습니다.';
            errorEmail.classList.add('false');
            return false;
        }
    });
}
//비밀번호 검증
function checkPasswordValid(password) {
    if (password.length > 5) {
        return true;
    }
    else {
        return false;
    }
}
//비밀번호 일치 검증
function checkPasswordCorrect(password, check) {
    const checkPassword = password;
    const checkCorr = check;
    if (checkPassword === checkCorr) {
        return true;
    }
    else {
        return false;
    }
}
//버튼 활성화 함수
function btnCheckValid() {
    return __awaiter(this, void 0, void 0, function* () {
        const emailCheckedResult = yield checkEmailValid(email.value);
        const passwordCheckedResult = checkPasswordCorrect(password.value, checkPassword.value);
        if (emailCheckedResult && passwordCheckedResult) {
            nextBtn.disabled = false;
        }
        else {
            nextBtn.disabled = true;
        }
    });
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
    }
    else {
        errorPassword.classList.add('false');
        errorPassword.innerText = '*비밀번호는 6~16자 이내로 입력해 주세요.';
    }
});
checkPassword.addEventListener('input', (e) => {
    e.preventDefault();
    if (checkPasswordCorrect(password.value, checkPassword.value)) {
        checkMsg.innerText = '';
        checkMsg.classList.add('true');
        checkMsg.classList.remove('false');
    }
    else {
        checkMsg.classList.add('false');
        checkMsg.innerText = '*비밀번호가 일치하지 않습니다.';
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
const thumbnailImg = document.querySelector('.wrapper-upload-img');
const name = document.querySelector('#name');
const id = document.querySelector('#user-id');
const intro = document.querySelector('#intro');
const errorName = document.querySelector('.msg-error.username');
const errorId = document.querySelector('.msg-error.userid');
const startBtn = document.querySelector('.btn-start');
// 버튼 활성화 함수
function checkBtn() {
    return __awaiter(this, void 0, void 0, function* () {
        const nameCheckedResult = checkNameValid(name.value);
        const idCheckedResult = yield checkIdValid(id.value);
        if (nameCheckedResult && idCheckedResult) {
            startBtn.disabled = false;
        }
        else {
            startBtn.disabled = true;
        }
    });
}
profileForm.addEventListener('input', () => {
    checkBtn();
});
// name 체크
function checkNameValid(name) {
    if (name == '') {
        errorName.innerText = '*사용자 이름은 필수 입력사항 입니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        return false;
    }
    else if (name.length < 2 || name.length > 11) {
        errorName.innerText = '*사용자 이름은 2~10자 이내여야 합니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        return false;
    }
    else {
        errorName.classList.remove('false');
        return true;
    }
}
// id 체크, 검증
function checkIdValid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const regex = /^[a-zA-Z0-9_.]{1,10}$/;
            if (id == '') {
                errorId.innerText = '*계정ID는 필수 입력사항 입니다.';
                errorId.classList.remove('true');
                errorId.classList.add('false');
                return false;
            }
            else if (!regex.test(id)) {
                errorId.innerText =
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
            const resMsg = yield getIdValidMsg(idData);
            if (resMsg === '사용 가능한 계정ID 입니다.') {
                errorId.innerText = '*' + resMsg;
                errorId.classList.remove('false');
                errorId.classList.add('true');
                return true;
            }
            else if (resMsg === '이미 가입된 계정ID 입니다.') {
                errorId.innerText = '*' + resMsg;
                errorId.classList.remove('true');
                errorId.classList.add('false');
                return false;
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
// 이미지 업로드
function uploadImg(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const target = e.target;
            if (target.files !== null) {
                const file = target.files[0];
                const imgURL = yield handleUploadImage(file);
                thumbnailImg.style.backgroundImage = `url(${imgURL})`;
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
imgBtn.addEventListener('change', (e) => {
    uploadImg(e);
});
// 유저 정보 post
function userInfo(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const image = thumbnailImg.style.backgroundImage !== ''
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
            const resMsg = yield signUp(reqData);
            if (resMsg === '회원가입 성공') {
                location.href = './login.html';
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
startBtn.addEventListener('click', (e) => {
    userInfo(e);
});
